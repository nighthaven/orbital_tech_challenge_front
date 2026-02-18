import './thinking-block.styles.scss'

interface ThinkingBlockProps {
    content: string
}

export default function ThinkingBlock({ content }: ThinkingBlockProps) {
    return (
        <details className="thinking-block">
            <summary>
                <span>◈</span>
                <span className="thinking-label">Thinking</span>
                <span className="thinking-chevron">▼</span>
            </summary>
            <div className="thinking-content">{content}</div>
        </details>
    )
}
