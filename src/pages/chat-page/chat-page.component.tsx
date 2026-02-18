import './chat-page.styles.scss'
import MessageList from './components/message-list/message-list.component'
import MessageInput from './components/message-input/message-input.component'

export default function ChatPage() {
    return (
        <main className="chat-container">
            <MessageList />
            <MessageInput />
        </main>
    )
}
