export interface TableEvent {
    type: 'table'
    content: Record<string, unknown>[]
    columns?: string[]
}