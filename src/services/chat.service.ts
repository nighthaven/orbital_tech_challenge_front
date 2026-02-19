import { API_BASE_URL, WS_BASE_URL } from '../config/api.config'
import type { AskQuery } from '../types/chat/ask-query.types'
import type { StreamEvent } from '../types/stream-event.types.ts'
import type { StreamEventHandlers } from '../types/stream-event-handlers.types.ts'

export class ChatServiceError extends Error {
    public readonly statusCode?: number

    constructor(message: string, statusCode?: number) {
        super(message)
        this.name = 'ChatServiceError'
        this.statusCode = statusCode
    }
}

export class ChatService {
    private websocket: WebSocket | null = null

    connect(sessionId: string, handlers: StreamEventHandlers): void {
        if (this.websocket) {
            this.disconnect()
        }

        const url = `${WS_BASE_URL}/sessions/${sessionId}/chat`
        this.websocket = new WebSocket(url)

        this.websocket.onopen = () => {
            handlers.onOpen?.()
        }

        this.websocket.onclose = () => {
            handlers.onClose?.()
        }

        this.websocket.onerror = () => {
            handlers.onError?.({
                type: 'error',
                content: 'La connexion WebSocket a rencontré une erreur.',
            })
        }

        this.websocket.onmessage = (event: MessageEvent<string>) => {
            let data: StreamEvent

            try {
                data = JSON.parse(event.data) as StreamEvent
            } catch {
                return
            }

            switch (data.type) {
                case 'thinking':
                    handlers.onThinking?.(data)
                    break
                case 'tool_call':
                    handlers.onToolCall?.(data)
                    break
                case 'tool_result':
                    handlers.onToolResult?.(data)
                    break
                case 'text':
                    handlers.onText?.(data)
                    break
                case 'plot':
                    handlers.onPlot?.(data)
                    break
                case 'table':
                    handlers.onTable?.(data)
                    break
                case 'error':
                    handlers.onError?.(data)
                    break
                case 'done':
                    handlers.onDone?.(data)
                    break
            }
        }
    }

    sendQuestion(question: string): void {
        if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
            throw new ChatServiceError(
                'WebSocket non connecté — appelle connect() avant sendQuestion().',
            )
        }

        const payload: AskQuery = { question }
        this.websocket.send(JSON.stringify(payload))
    }

    disconnect(): void {
        if (this.websocket) {
            this.websocket.close()
            this.websocket = null
        }
    }

    get isConnected(): boolean {
        return this.websocket?.readyState === WebSocket.OPEN
    }
}

export const chatService = new ChatService()
