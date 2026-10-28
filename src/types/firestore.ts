import type { FieldValue, Timestamp } from 'firebase/firestore';

/** Taxas de quadros suportadas pela transmissão. */
export type FpsOption = 5 | 72030 | 72060 | 108030 | 108060;

/** Status do ciclo de vida de uma transmissão. */
export type BroadcastStatus = 'live' | 'ended';

/** Status do ciclo de vida de uma sessão. */
export type SessionStatus = 'active' | 'closed';

/** Documento em `sessions/{sessionId}`. */
export interface SessionDoc {
  code: string;
  hostId: string;
  hostName: string;
  status: SessionStatus;
  createdAt?: Timestamp | FieldValue;
  closedAt?: Timestamp | FieldValue;
}

/** Status do ciclo de vida da conexão de um espectador específico. */
export type ViewerStatus = 'requested' | 'offered' | 'answered' | 'closed';

/** Documento em `users/{uid}`. */
export interface AppUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  online: boolean;
  status: string;
  isLive: boolean;
  liveBroadcastId: string | null;
  /** Sessão em que o usuário está atualmente. `null` quando não está em nenhuma. */
  currentSessionId: string | null;
  lastSeen?: Timestamp | FieldValue;
  cameraActive?: boolean;
}

/** Documento em `broadcasts/{broadcastId}`. */
export interface BroadcastDoc {
  hostId: string;
  hostName: string;
  fps: FpsOption;
  status: BroadcastStatus;
  createdAt?: Timestamp | FieldValue;
  endedAt?: Timestamp | FieldValue;
}

/** Descrição de sessão WebRTC (offer/answer) serializada para o Firestore. */
export interface SerializedSessionDescription {
  type: RTCSdpType;
  sdp: string;
}

/** Documento em `broadcasts/{broadcastId}/viewers/{viewerId}`. */
export interface ViewerDoc {
  viewerId: string;
  viewerName: string;
  status: ViewerStatus;
  offer?: SerializedSessionDescription;
  answer?: SerializedSessionDescription;
  requestedAt?: Timestamp | FieldValue;
}

/** Estado local de "estou assistindo a transmissão de alguém". */
export interface WatchingState {
  broadcastId: string;
  hostId: string;
  hostName: string;
}

/** Configuração escolhida no modal antes de iniciar uma transmissão. */
export interface StartBroadcastConfig {
  fps: FpsOption;
}
