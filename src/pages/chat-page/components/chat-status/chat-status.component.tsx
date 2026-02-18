import './chat-status.styles.scss'
import type { SessionStatus } from '../../../../types/session/session-status.types.ts'

interface ChatStatusProps {
    status: Exclude<SessionStatus, 'ready'>
    error: string | null
    onRetry: () => void
}

export default function ChatStatus({ status, error, onRetry }: ChatStatusProps) {
    if (status === 'connecting') {
        return (
            <div className="chat-status">
                <div className="status-dots">
                    <span className="status-dot" />
                    <span className="status-dot" />
                    <span className="status-dot" />
                </div>
                <p className="status-label">Connexion en cours…</p>
            </div>
        )
    }

    return (
        <div className="chat-status">
            <span className="status-error-icon">⚠</span>
            <p className="status-label">Impossible de se connecter au serveur</p>
            {error && <p className="status-detail">{error}</p>}
            <button className="retry-button" onClick={onRetry}>
                Réessayer
            </button>
        </div>
    )
}
