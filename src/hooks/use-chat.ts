import { useCallback, useEffect, useRef, useState } from 'react'
import { chatService } from '../services/chat.service'
import { useSession } from '../context/session.context'
import type {
    AssistantChatMessage,
    ChatMessage,
    ToolCallState,
    UserChatMessage,
} from '../types/chat/chat-message.types'

export function useChat() {
    const { sessionId } = useSession()
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [isStreaming, setIsStreaming] = useState(false)
    const stockPendingQuestionRef = useRef<string | null>(null)

    // Réinitialise les messages quand la session change (nouvelle conversation)
    useEffect(() => {
        chatService.disconnect()
        setMessages([])
        setIsStreaming(false)
    }, [sessionId])

    const sendMessage = useCallback(
        (question: string) => {
            const trimmed = question.trim()
            if (!sessionId || isStreaming || !trimmed) return

            const userMessage: UserChatMessage = {
                id: crypto.randomUUID(),
                type: 'user',
                content: trimmed,
            }

            const assistantId = crypto.randomUUID()
            const assistantPlaceholder: AssistantChatMessage = {
                id: assistantId,
                type: 'assistant',
                thinking: '',
                toolCalls: [],
                text: '',
                plot: null,
                table: null,
                tableColumns: [],
                isStreaming: true,
            }

            setMessages(prev => [...prev, userMessage, assistantPlaceholder])
            setIsStreaming(true)
            stockPendingQuestionRef.current = trimmed

            const updateAssistant = (
                updater: (msg: AssistantChatMessage) => AssistantChatMessage,
            ) => {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === assistantId && msg.type === 'assistant'
                            ? updater(msg)
                            : msg,
                    ),
                )
            }

            const finishStreaming = () => {
                updateAssistant(msg => ({ ...msg, isStreaming: false }))
                setIsStreaming(false)
                chatService.disconnect()
            }

            chatService.connect(sessionId, {
                onOpen: () => {
                    const q = stockPendingQuestionRef.current
                    if (q) {
                        chatService.sendQuestion(q)
                        stockPendingQuestionRef.current = null
                    }
                },

                onThinking: ({ content }) => {
                    updateAssistant(msg => ({
                        ...msg,
                        thinking: msg.thinking + content,
                    }))
                },

                onToolCall: ({ name, args }) => {
                    const newCall: ToolCallState = {
                        id: crypto.randomUUID(),
                        name,
                        args,
                        result: null,
                    }
                    updateAssistant(msg => ({
                        ...msg,
                        toolCalls: [...msg.toolCalls, newCall],
                    }))
                },

                onToolResult: ({ name, result }) => {
                    updateAssistant(msg => ({
                        ...msg,
                        toolCalls: msg.toolCalls.map(tc =>
                            tc.name === name && tc.result === null
                                ? { ...tc, result }
                                : tc,
                        ),
                    }))
                },

                onText: ({ content }) => {
                    updateAssistant(msg => ({ ...msg, text: msg.text + content }))
                },

                onPlot: ({ content }) => {
                    updateAssistant(msg => ({ ...msg, plot: content }))
                },

                onTable: ({ content, columns }) => {
                    updateAssistant(msg => ({
                        ...msg,
                        table: content,
                        tableColumns: columns ?? Object.keys(content[0] ?? {}),
                    }))
                },

                onDone: () => {
                    finishStreaming()
                },

                onClose: () => {
                    updateAssistant(msg => ({ ...msg, isStreaming: false }))
                    setIsStreaming(false)
                },

                onError: ({ content }) => {
                    updateAssistant(msg => ({ ...msg, text: content }))
                    finishStreaming()
                },
            })
        },
        [sessionId, isStreaming],
    )

    return { messages, isStreaming, sendMessage }
}
