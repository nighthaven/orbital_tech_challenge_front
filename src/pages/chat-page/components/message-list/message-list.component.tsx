import { useEffect, useRef } from 'react'
import './message-list.styles.scss'
import type { ChatMessage } from '../../../../types/chat/chat-message.types'
import UserMessage from '../user-message/user-message.component'
import AssistantMessage from '../assistant-message/assistant-message.component'

interface MessageListProps {
    messages: ChatMessage[]
}

export default function MessageList({ messages }: MessageListProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = containerRef.current
        if (el) {
            el.scrollTop = el.scrollHeight
        }
    }, [messages])

    return (
        <div className="messages" ref={containerRef}>
            <div className="messages-inner">
                {messages.map(msg =>
                    msg.type === 'user' ? (
                        <UserMessage key={msg.id} content={msg.content} />
                    ) : (
                        <AssistantMessage key={msg.id} {...msg} />
                    ),
                )}
            </div>
        </div>
    )
}
