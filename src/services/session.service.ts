import { API_BASE_URL } from '../config/api.config'
import type { SessionResponse } from '../types/session.types'

export class SessionServiceError extends Error {
    public readonly statusCode?: number

    constructor(message: string, statusCode?: number) {
        super(message)
        this.name = 'SessionServiceError'
        this.statusCode = statusCode
    }
}

export class SessionService {
    async createSession(): Promise<SessionResponse> {
        const response = await fetch(`${API_BASE_URL}/sessions/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            throw new SessionServiceError(
                `Impossible de créer la session : ${response.statusText}`,
                response.status,
            )
        }

        return response.json() as Promise<SessionResponse>
    }

    async deleteSession(sessionId: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
            method: 'DELETE',
        })

        if (response.status === 404) {
            throw new SessionServiceError(`Session introuvable : ${sessionId}`, 404)
        }

        if (!response.ok) {
            throw new SessionServiceError(
                `Impossible de supprimer la session : ${response.statusText}`,
                response.status,
            )
        }
    }
}

export const sessionService = new SessionService()
