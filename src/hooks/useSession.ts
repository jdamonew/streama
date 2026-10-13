import { useCallback, useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '@/firebase';
import type { AppUser, SessionDoc } from '@/types/firestore';

const CODE_LENGTH = 6;
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function generateSessionCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i += 1) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}

export interface ActiveSessionState {
  sessionId: string;
  code: string;
  hostId: string;
  hostName: string;
  isHost: boolean;
}

export interface UseSessionResult {
  session: ActiveSessionState | null;
  sessionLoading: boolean;
  creatingSession: boolean;
  joiningSession: boolean;
  regeneratingCode: boolean;
  sessionError: string | null;
  sessionClosedNotice: boolean;
  createSession: () => Promise<void>;
  joinSession: (code: string) => Promise<boolean>;
  regenerateCode: () => Promise<void>;
  leaveSession: () => Promise<void>;
  endSession: () => Promise<void>;
  dismissClosedNotice: () => void;
}

export function useSession(currentUser: User | null): UseSessionResult {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [session, setSession] = useState<ActiveSessionState | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [creatingSession, setCreatingSession] = useState(false);
  const [joiningSession, setJoiningSession] = useState(false);
  const [regeneratingCode, setRegeneratingCode] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [sessionClosedNotice, setSessionClosedNotice] = useState(false);

  const sessionDocUnsubRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setCurrentSessionId(null);
      setSessionLoading(false);
      return;
    }

    const userDocRef = doc(db, 'users', currentUser.uid);
    const unsub = onSnapshot(userDocRef, (snap) => {
      const data = snap.data() as AppUser | undefined;
      setCurrentSessionId(data?.currentSessionId ?? null);
      setSessionLoading(false);
    });

    return unsub;
  }, [currentUser]);

  useEffect(() => {
    sessionDocUnsubRef.current?.();
    sessionDocUnsubRef.current = null;

    if (!currentSessionId || !currentUser) {
      setSession(null);
      return;
    }

    const sessionDocRef = doc(db, 'sessions', currentSessionId);
    const unsub = onSnapshot(sessionDocRef, (snap) => {
      const data = snap.data() as SessionDoc | undefined;

      if (!data || data.status === 'closed') {
        setSessionClosedNotice(true);
        setSession(null);
        updateDoc(doc(db, 'users', currentUser.uid), { currentSessionId: null }).catch(() => { });
        return;
      }

      setSession({
        sessionId: currentSessionId,
        code: data.code,
        hostId: data.hostId,
        hostName: data.hostName,
        isHost: data.hostId === currentUser.uid,
      });
    });

    sessionDocUnsubRef.current = unsub;
    return unsub;
  }, [currentSessionId, currentUser]);

  useEffect(() => {
    return () => sessionDocUnsubRef.current?.();
  }, []);

  const createSession = useCallback(async (): Promise<void> => {
    if (!currentUser) return;

    try {
      setSessionError(null);
      setCreatingSession(true);

      const payload: SessionDoc = {
        hostId: currentUser.uid,
        hostName: currentUser.displayName || currentUser.email || 'Usuário',
        code: generateSessionCode(),
        status: 'active',
        createdAt: serverTimestamp(),
      };
      const sessionRef = await addDoc(collection(db, 'sessions'), payload);

      await updateDoc(doc(db, 'users', currentUser.uid), {
        currentSessionId: sessionRef.id,
      });
    } catch (err) {
      const error = err as Error;
      setSessionError(error.message || 'Não foi possível criar a sessão.');
    } finally {
      setCreatingSession(false);
    }
  }, [currentUser]);

  const joinSession = useCallback(
    async (rawCode: string): Promise<boolean> => {
      if (!currentUser) return false;

      const normalizedCode = rawCode.trim().toUpperCase();
      if (!normalizedCode) {
        setSessionError('Informe o código da sessão.');
        return false;
      }

      try {
        setSessionError(null);
        setJoiningSession(true);

        const q = query(
          collection(db, 'sessions'),
          where('code', '==', normalizedCode),
          where('status', '==', 'active')
        );
        const snap = await getDocs(q);

        if (snap.empty) {
          setSessionError('Código inválido ou sessão encerrada.');
          return false;
        }

        const [sessionDoc] = snap.docs;
        await updateDoc(doc(db, 'users', currentUser.uid), {
          currentSessionId: sessionDoc.id,
        });
        return true;
      } catch (err) {
        const error = err as Error;
        setSessionError(error.message || 'Não foi possível ingressar na sessão.');
        return false;
      } finally {
        setJoiningSession(false);
      }
    },
    [currentUser]
  );

  const regenerateCode = useCallback(async (): Promise<void> => {
    if (!currentUser || !session || !session.isHost) return;

    try {
      setSessionError(null);
      setRegeneratingCode(true);
      await updateDoc(doc(db, 'sessions', session.sessionId), {
        code: generateSessionCode(),
      });
    } catch (err) {
      const error = err as Error;
      setSessionError(error.message || 'Não foi possível gerar um novo código.');
    } finally {
      setRegeneratingCode(false);
    }
  }, [currentUser, session]);

  const leaveSession = useCallback(async (): Promise<void> => {
    if (!currentUser) return;
    await updateDoc(doc(db, 'users', currentUser.uid), { currentSessionId: null }).catch(() => { });
  }, [currentUser]);

  const endSession = useCallback(async (): Promise<void> => {
    if (!currentUser || !session || !session.isHost) return;

    try {
      await updateDoc(doc(db, 'sessions', session.sessionId), {
        status: 'closed',
        closedAt: serverTimestamp(),
      });
    } finally {
      await updateDoc(doc(db, 'users', currentUser.uid), { currentSessionId: null }).catch(
        () => { }
      );
    }
  }, [currentUser, session]);

  const dismissClosedNotice = useCallback((): void => {
    setSessionClosedNotice(false);
  }, []);

  return {
    session,
    sessionLoading,
    creatingSession,
    joiningSession,
    regeneratingCode,
    sessionError,
    sessionClosedNotice,
    createSession,
    joinSession,
    regenerateCode,
    leaveSession,
    endSession,
    dismissClosedNotice,
  };
}
