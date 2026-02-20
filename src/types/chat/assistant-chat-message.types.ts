import type {ToolCallState} from "./toolcall-state.types.ts";

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