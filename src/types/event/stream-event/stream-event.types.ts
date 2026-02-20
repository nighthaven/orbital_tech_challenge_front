import type {ThinkingEvent} from "../thinking-event.types.ts";
import type {ToolCallEvent} from "../toolcall-event.types.ts";
import type {ToolResultEvent} from "../toolresult-event.types.ts";
import type {TextEvent} from "../text-event.types.ts";
import type {PlotEvent} from "../plot-event.types.ts";
import type {TableEvent} from "../table-event.types.ts";
import type {ErrorEvent} from "../error-event.types.ts";
import type {DoneEvent} from "../done-event.types.ts";


export type StreamEvent =
    | ThinkingEvent
    | ToolCallEvent
    | ToolResultEvent
    | TextEvent
    | PlotEvent
    | TableEvent
    | ErrorEvent
    | DoneEvent