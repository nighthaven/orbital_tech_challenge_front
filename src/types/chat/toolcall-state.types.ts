export interface ToolCallState {
    id: string
    name: string
    args: Record<string, unknown>
    result: unknown | null
}