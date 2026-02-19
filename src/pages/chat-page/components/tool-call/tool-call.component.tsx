import './tool-call.styles.scss'
import type { ToolCallState } from '../../../../types/chat/chat-message.types'

type ToolCallProps = ToolCallState

export default function ToolCall({ name, args, result }: ToolCallProps) {
    const displayArgs = JSON.stringify(args, null, 2)
    const isPending = result === null
    const displayResult = isPending
        ? null
        : typeof result === 'string'
          ? result
          : JSON.stringify(result, null, 2)

    return (
        <div className="tool-call">
            <div className="tool-header">
                <span className="tool-icon">⚙</span>
                <span className="tool-name">{name}</span>
                {isPending && <span className="tool-pending-badge">en cours…</span>}
            </div>
            <div className="tool-body">
                <div className="tool-section">
                    <div className="section-label">Arguments</div>
                    <pre className="tool-pre">{displayArgs}</pre>
                </div>
                {!isPending && (
                    <div className="tool-section">
                        <div className="section-label">Résultat</div>
                        <pre className="tool-pre">{displayResult}</pre>
                    </div>
                )}
            </div>
        </div>
    )
}
