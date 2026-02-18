import './message-list.styles.scss'
import UserMessage from '../user-message/user-message.component'
import AssistantMessage from '../assistant-message/assistant-message.component'

export default function MessageList() {
    return (
        <div className="messages">
            <div className="messages-inner">
                <UserMessage content="Tu veux descendre à 55 ?" />
                <AssistantMessage />
            </div>
        </div>
    )
}
