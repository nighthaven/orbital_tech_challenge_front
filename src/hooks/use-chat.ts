import { useCallback, useRef, useState } from 'react'
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

    // Stocke la question à envoyer une fois la connexion WS ouverte
    const pendingQuestionRef = useRef<string | null>(null)

    const sendMessage = useCallback(
        (question: string) => {
            const trimmed = question.trim()
            if (!sessionId || isStreaming || !trimmed) return

            // 1. Ajouter le message utilisateur immédiatement
            const userMessage: UserChatMessage = {
                id: crypto.randomUUID(),
                type: 'user',
                content: trimmed,
            }

            // 2. Créer un message assistant vide (sera rempli au fil du streaming)
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
            pendingQuestionRef.current = trimmed

            // Helper : met à jour le message assistant en cours sans écraser tout l'état
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

            // 3. Ouvrir la connexion WebSocket et enregistrer les handlers
            chatService.connect(sessionId, {
                // La question est envoyée dans onOpen car le WS doit être OPEN avant send()
                onOpen: () => {
                    const q = pendingQuestionRef.current
                    if (q) {
                        chatService.sendQuestion(q)
                        pendingQuestionRef.current = null
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
                        result: null, // le résultat arrivera via onToolResult
                    }
                    updateAssistant(msg => ({
                        ...msg,
                        toolCalls: [...msg.toolCalls, newCall],
                    }))
                },

                onToolResult: ({ name, result }) => {
                    // On met à jour le premier tool call sans résultat qui porte ce nom
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
                    // Sécurité : si la connexion se ferme sans event done/error
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
