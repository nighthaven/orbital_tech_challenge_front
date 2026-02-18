import type {ThinkingEvent} from "./chat/thinking-event.types.ts";
import type {ToolCallEvent} from "./chat/toolcall-event.types.ts";
import type {ToolResultEvent} from "./chat/toolresult-event.types.ts";
import type {TextEvent} from "./chat/text-event.types.ts";
import type {PlotEvent} from "./chat/plot-event.types.ts";
import type {TableEvent} from "./chat/table-event.types.ts";
import type {ErrorEvent} from "./chat/error-event.types.ts";
import type {DoneEvent} from "./chat/done-event.types.ts";


export type StreamEvent =
    | ThinkingEvent
    | ToolCallEvent
    | ToolResultEvent
    | TextEvent
    | PlotEvent
    | TableEvent
    | ErrorEvent
    | DoneEvent