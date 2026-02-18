import type {ThinkingEvent} from "./chat/thinking-event.types.ts";
import type {ToolCallEvent} from "./chat/toolcall-event.types.ts";
import type {ToolResultEvent} from "./chat/toolresult-event.types.ts";
import type {TextEvent} from "./chat/text-event.types.ts";
import type {PlotEvent} from "./chat/plot-event.types.ts";
import type {TableEvent} from "./chat/table-event.types.ts";
import type {ErrorEvent} from "./chat/error-event.types.ts";
import type {DoneEvent} from "./chat/done-event.types.ts";


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
