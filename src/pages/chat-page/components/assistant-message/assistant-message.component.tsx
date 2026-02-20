import './assistant-message.styles.scss'
import type { AssistantChatMessage } from '../../../../types/chat/assistant-chat-message.types.ts'
import ThinkingBlock from '../thinking-block/thinking-block.component'
import ToolCall from '../tool-call/tool-call.component'
import PlotContainer from '../plot-container/plot-container.component'
import DataTable from '../data-table/data-table.component'

type AssistantMessageProps = AssistantChatMessage

export default function AssistantMessage({
    thinking,
    toolCalls,
    text,
    plot,
    table,
    tableColumns,
    isStreaming,
}: AssistantMessageProps) {
    return (
        <div className="assistant-message">
            <div className="assistant-header">
                <div className="assistant-avatar">✦</div>
                <span className="assistant-label">Orbital Agent</span>
            </div>

            <div className="assistant-body">
                {thinking && <ThinkingBlock content={thinking} />}

                {toolCalls.map(tc => (
                    <ToolCall key={tc.id} {...tc} />
                ))}

                {text && <div className="assistant-text">{text}</div>}

                {isStreaming && !text && (
                    <div className="assistant-streaming">
                        <span className="streaming-dot" />
                        <span className="streaming-dot" />
                        <span className="streaming-dot" />
                    </div>
                )}

                {plot && <PlotContainer data={plot} />}

                {table && <DataTable data={table} columns={tableColumns} />}
            </div>
        </div>
    )
}
