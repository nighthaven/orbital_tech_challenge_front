import './chat-page.styles.scss'
import { useSession } from '../../context/session.context'
import MessageList from './components/message-list/message-list.component'
import MessageInput from './components/message-input/message-input.component'
import ChatStatus from './components/chat-status/chat-status.component'

export default function ChatPage() {
    const { status, error, retry } = useSession()

    return (
        <main className="chat-container">
            {status === 'ready' ? (
                <>
                    <MessageList />
                    <MessageInput />
                </>
            ) : (
                <ChatStatus status={status} error={error} onRetry={retry} />
            )}
        </main>
    )
}
