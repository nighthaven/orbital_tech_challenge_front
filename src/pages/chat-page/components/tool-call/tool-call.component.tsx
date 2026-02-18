import './tool-call.styles.scss'

interface ToolCallProps {
    name: string
    args: string
    result: string
}

export default function ToolCall({ name, args, result }: ToolCallProps) {
    return (
        <div className="tool-call">
            <div className="tool-header">
                <span className="tool-icon">⚙</span>
                <span className="tool-name">{name}</span>
            </div>
            <div className="tool-body">
                <div className="tool-section">
                    <div className="section-label">Arguments</div>
                    <pre className="tool-pre">{args}</pre>
                </div>
                <div className="tool-section">
                    <div className="section-label">Résultat</div>
                    <pre className="tool-pre">{result}</pre>
                </div>
            </div>
        </div>
    )
}
