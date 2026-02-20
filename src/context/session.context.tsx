import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { sessionService } from '../services/session-service/session.service.ts'
import type { SessionStatus } from '../types/session/session-status.types.ts'



interface SessionContextValue {
    sessionId: string | null
    status: SessionStatus
    error: string | null
    retry: () => void
    newConversation: () => Promise<void>
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [status, setStatus] = useState<SessionStatus>('connecting')
    const [error, setError] = useState<string | null>(null)

    const sessionIdRef = useRef<string | null>(null)

    const createNewSession = useCallback(async () => {
        setStatus('connecting')
        setError(null)

        try {
            const { session_id } = await sessionService.createSession()
            setSessionId(session_id)
            sessionIdRef.current = session_id
            setStatus('ready')
        } catch (err) {
            setStatus('error')
            setError(err instanceof Error ? err.message : 'Erreur de connexion au serveur.')
        }
    }, [])

    const cleanupCurrentSession = useCallback(async () => {
        const id = sessionIdRef.current
        if (!id) return
        sessionIdRef.current = null
        setSessionId(null)
        try {
            await sessionService.deleteSession(id)
        } catch {
            // best effort — la session est en mémoire côté serveur, elle disparaît au redémarrage
        }
    }, [])

    const newConversation = useCallback(async () => {
        await cleanupCurrentSession()
        await createNewSession()
    }, [cleanupCurrentSession, createNewSession])

    useEffect(() => {
        createNewSession()

        return () => {
            cleanupCurrentSession()
        }
    }, [createNewSession, cleanupCurrentSession])

    useEffect(() => {
        const handleBeforeUnload = () => {
            const id = sessionIdRef.current
            if (id) {
                sessionService.deleteSession(id).catch(() => {})
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [])

    return (
        <SessionContext.Provider
            value={{
                sessionId,
                status,
                error,
                retry: createNewSession,
                newConversation,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}


export function useSession(): SessionContextValue {
    const ctx = useContext(SessionContext)
    if (!ctx) {
        throw new Error('useSession() doit être utilisé dans un <SessionProvider>.')
    }
    return ctx
}
