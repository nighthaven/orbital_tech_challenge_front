export interface ToolResultEvent {
    type: 'tool_result'
    name: string
    result: unknown
}