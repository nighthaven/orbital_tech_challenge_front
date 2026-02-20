export interface ToolCallEvent {
    type: 'tool_call'
    name: string
    args: Record<string, unknown>
}