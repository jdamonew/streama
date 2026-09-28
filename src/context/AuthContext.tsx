import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/firebase';
import type { AppUser } from '@/types/firestore';

export interface AuthContextValue {
  currentUser: User | null;
  loading: boolean;
  register: (email: string, password: string, displayName?: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  statusUpdate: (status: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth precisa ser usado dentro de um <AuthProvider>');
  }
  return ctx;
}

type UserDocWrite = Pick<
  AppUser,
  'uid' | 'displayName' | 'email' | 'photoURL' | 'online' | 'status' | 'isLive' | 'liveBroadcastId'
>;

async function upsertUserDoc(user: User, online: boolean, status: string): Promise<void> {
  const payload: UserDocWrite = {
    uid: user.uid,
    displayName: user.displayName ?? user.email,
    email: user.email,
    photoURL: user.photoURL ?? null,
    online,
    status,
    isLive: false,
    liveBroadcastId: null,
  };

  await setDoc(
    doc(db, 'users', user.uid),
    { ...payload, lastSeen: serverTimestamp() },
    { merge: true }
  );
}

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        await upsertUserDoc(user, true, 'online');
      }
    });
    return unsubscribe;
  }, []);

  async function register(
    email: string,
    password: string,
    displayName?: string
  ): Promise<User> {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    await upsertUserDoc(cred.user, true, 'online');
    return cred.user;
  }

  async function login(email: string, password: string): Promise<User> {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await upsertUserDoc(cred.user, true, 'online');
    return cred.user;
  }

  async function loginWithGoogle(): Promise<User> {
    const cred = await signInWithPopup(auth, googleProvider);
    await upsertUserDoc(cred.user, true, 'online');
    return cred.user;
  }

  async function logout(): Promise<void> {
    if (auth.currentUser) {
      await upsertUserDoc(auth.currentUser, false, 'offline');
      // encerrar a sessão de autenticação também tira o usuário de qualquer
      // sessão de compartilhamento em que ele estivesse
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        currentSessionId: null,
      }).catch(() => {});
    }
    await signOut(auth);
  }

  async function statusUpdate(status: string): Promise<void> {
    if (auth.currentUser) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        status: status
      })
    }
  }

  const value: AuthContextValue = {
    currentUser,
    loading,
    register,
    login,
    loginWithGoogle,
    statusUpdate,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
