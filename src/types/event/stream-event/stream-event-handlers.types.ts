import type {ThinkingEvent} from "../thinking-event.types.ts";
import type {ToolCallEvent} from "../toolcall-event.types.ts";
import type {ToolResultEvent} from "../toolresult-event.types.ts";
import type {TextEvent} from "../text-event.types.ts";
import type {PlotEvent} from "../plot-event.types.ts";
import type {TableEvent} from "../table-event.types.ts";
import type {ErrorEvent} from "../error-event.types.ts";
import type {DoneEvent} from "../done-event.types.ts";


export interface StreamEventHandlers {
    onThinking?: (event: ThinkingEvent) => void
    onToolCall?: (event: ToolCallEvent) => void
    onToolResult?: (event: ToolResultEvent) => void
    onText?: (event: TextEvent) => void
    onPlot?: (event: PlotEvent) => void
    onTable?: (event: TableEvent) => void
    onError?: (event: ErrorEvent) => void
    onDone?: (event: DoneEvent) => void
    onOpen?: () => void
    onClose?: () => void
}
