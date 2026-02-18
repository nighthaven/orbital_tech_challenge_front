import './user-message.styles.scss'

interface UserMessageProps {
    content: string
}

export default function UserMessage({ content }: UserMessageProps) {
    return (
        <div className="user-message">
            <div className="user-bubble">{content}</div>
        </div>
    )
}
