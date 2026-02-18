import type {ToolCallRecord} from "./toolcall-record.types.ts";

export interface AskResponse {
    answer: string
    thoughts?: string
    tool_calls?: ToolCallRecord[]
}