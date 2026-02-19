import { useEffect, useRef } from 'react'
import './message-list.styles.scss'
import type { ChatMessage } from '../../../../types/chat/chat-message.types'
import UserMessage from '../user-message/user-message.component'
import AssistantMessage from '../assistant-message/assistant-message.component'

interface MessageListProps {
    messages: ChatMessage[]
}

export default function MessageList({ messages }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="messages">
            <div className="messages-inner">
                {messages.map(msg =>
                    msg.type === 'user' ? (
                        <UserMessage key={msg.id} content={msg.content} />
                    ) : (
                        <AssistantMessage key={msg.id} {...msg} />
                    ),
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    )
}
