import './chat-page.styles.scss'
import { useSession } from '../../context/session.context'
import { useChat } from '../../hooks/use-chat'
import MessageList from './components/message-list/message-list.component'
import MessageInput from './components/message-input/message-input.component'
import ChatStatus from './components/chat-status/chat-status.component'

export default function ChatPage() {
    const { status, error, retry, newConversation } = useSession()
    const { messages, isStreaming, sendMessage } = useChat()

    if (status !== 'ready') {
        return (
            <main className="chat-container">
                <ChatStatus status={status} error={error} onRetry={retry} />
            </main>
        )
    }

    return (
        <main className="chat-container">
            <header className="chat-header">
                <span className="chat-header-title">✦ Orbital Agent</span>
                <button
                    className="new-chat-button"
                    onClick={newConversation}
                    disabled={isStreaming}
                    title="Nouvelle conversation"
                >
                    + Nouveau chat
                </button>
            </header>
            <MessageList messages={messages} />
            <MessageInput onSubmit={sendMessage} disabled={isStreaming} />
        </main>
    )
}
