import { useRef } from 'react'
import './message-input.styles.scss'

interface MessageInputProps {
    onSubmit: (question: string) => void
    disabled?: boolean
}

export default function MessageInput({ onSubmit, disabled = false }: MessageInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = () => {
        const value = textareaRef.current?.value ?? ''
        if (!value.trim() || disabled) return
        onSubmit(value)
        if (textareaRef.current) {
            textareaRef.current.value = ''
            textareaRef.current.style.height = 'auto'
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const el = e.currentTarget
        el.style.height = 'auto'
        el.style.height = `${el.scrollHeight}px`
    }

    return (
        <div className="input-area">
            <div className="input-wrapper">
                <textarea
                    ref={textareaRef}
                    className="input-textarea"
                    placeholder="Pose ta question sur tes données…"
                    rows={1}
                    disabled={disabled}
                    onKeyDown={handleKeyDown}
                    onChange={handleInput}
                />
                <button
                    className="send-button"
                    aria-label="Envoyer"
                    onClick={handleSubmit}
                    disabled={disabled}
                >
                    ↑
                </button>
            </div>
            <p className="input-hint">Entrée pour envoyer · Maj+Entrée pour aller à la ligne</p>
        </div>
    )
}
