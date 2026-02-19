// État d'un outil pendant le streaming
// result === null signifie que le résultat n'est pas encore arrivé
export interface ToolCallState {
    id: string
    name: string
    args: Record<string, unknown>
    result: unknown | null
}

export interface UserChatMessage {
    id: string
    type: 'user'
    content: string
}

export interface AssistantChatMessage {
    id: string
    type: 'assistant'
    thinking: string
    toolCalls: ToolCallState[]
    text: string
    plot: Record<string, unknown> | null
    table: Record<string, unknown>[] | null
    tableColumns: string[]
    isStreaming: boolean
}

export type ChatMessage = UserChatMessage | AssistantChatMessage
