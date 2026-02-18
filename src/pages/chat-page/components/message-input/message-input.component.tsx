import './message-input.styles.scss'

export default function MessageInput() {
    return (
        <div className="input-area">
            <div className="input-wrapper">
                <textarea
                    className="input-textarea"
                    placeholder="Pose ta question sur tes données…"
                    rows={1}
                />
                <button className="send-button" aria-label="Envoyer">
                    ↑
                </button>
            </div>
            <p className="input-hint">Entrée pour envoyer · Maj+Entrée pour aller à la ligne</p>
        </div>
    )
}
