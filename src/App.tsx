import './App.css'
import { SessionProvider } from './context/session.context'
import ChatPage from './pages/chat-page/chat-page.component'

function App() {
    return (
        <SessionProvider>
            <ChatPage />
        </SessionProvider>
    )
}

export default App
