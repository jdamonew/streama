import { useCallback, useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db, rtcConfig } from '@/firebase';
import type {
  AppUser,
  BroadcastDoc,
  FpsOption,
  StartBroadcastConfig,
  ViewerDoc,
  WatchingState,
} from '@/types/firestore';


export const QUALITY_PRESETS: Record<FpsOption, MediaTrackConstraints> = {
  5: {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    frameRate: { ideal: 5, max: 5 },
  },

  72030: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 30, max: 30 },
  },

  72060: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 60, max: 60 },
  },

  108030: {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    frameRate: { ideal: 30, max: 30 },
  },

  108060: {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    frameRate: { ideal: 60, max: 60 },
  },
};


export interface UseBroadcastResult {
  // host
  isBroadcasting: boolean;
  hostStream: MediaStream | null;
  hostFps: FpsOption;
  viewerCount: number;
  hostError: string | null;
  startBroadcast: (config: StartBroadcastConfig) => Promise<void>;
  stopBroadcast: () => Promise<void>;
  changeHostQuality: (fps: FpsOption) => void;
  // espectador
  watching: WatchingState | null;
  remoteStream: MediaStream | null;
  viewerError: string | null;
  broadcastEnded: boolean;
  watchBroadcast: (targetUser: AppUser) => Promise<void>;
  stopWatching: () => Promise<void>;
  dismissEndedNotice: () => void;
}

export function useBroadcast(currentUser: User | null): UseBroadcastResult {
  // host
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [hostStream, setHostStream] = useState<MediaStream | null>(null);
  const [hostFps, setHostFps] = useState<FpsOption>(72030);
  const [viewerCount, setViewerCount] = useState(0);
  const [hostError, setHostError] = useState<string | null>(null);

  const hostStreamRef = useRef<MediaStream | null>(null);
  const broadcastIdRef = useRef<string | null>(null);
  const hostPeersRef = useRef<Record<string, RTCPeerConnection>>({});
  const hostUnsubsRef = useRef<Unsubscribe[]>([]);

  // espectador
  const [watching, setWatching] = useState<WatchingState | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [viewerError, setViewerError] = useState<string | null>(null);
  const [broadcastEnded, setBroadcastEnded] = useState(false);

  const viewerPcRef = useRef<RTCPeerConnection | null>(null);
  const viewerUnsubsRef = useRef<Unsubscribe[]>([]);
  const watchingRef = useRef<WatchingState | null>(null);

  // ============================ HOST ====================================

  const connectToViewer = useCallback(
    async (broadcastId: string, viewerId: string) => {
      const stream = hostStreamRef.current;
      if (!stream) return;

      const pc = new RTCPeerConnection(rtcConfig);
      hostPeersRef.current[viewerId] = pc;

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const viewerDocRef = doc(db, 'broadcasts', broadcastId, 'viewers', viewerId);
      const hostCandidatesCol = collection(viewerDocRef, 'hostCandidates');

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          addDoc(hostCandidatesCol, event.candidate.toJSON());
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      await updateDoc(viewerDocRef, {
        offer: { type: offer.type, sdp: offer.sdp },
        status: 'offered',
      });

      const unsubViewerDoc = onSnapshot(viewerDocRef, (snap) => {
        const data = snap.data() as ViewerDoc | undefined;
        if (data?.answer && !pc.currentRemoteDescription) {
          pc.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
      });
      hostUnsubsRef.current.push(unsubViewerDoc);

      const viewerCandidatesCol = collection(viewerDocRef, 'viewerCandidates');
      const unsubCandidates = onSnapshot(viewerCandidatesCol, (snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === 'added') {
            pc.addIceCandidate(new RTCIceCandidate(change.doc.data() as RTCIceCandidateInit));
          }
        });
      });
      hostUnsubsRef.current.push(unsubCandidates);
    },
    []
  );

  const stopBroadcast = useCallback(async (): Promise<void> => {
    const id = broadcastIdRef.current;

    Object.values(hostPeersRef.current).forEach((pc) => pc.close());
    hostPeersRef.current = {};
    hostUnsubsRef.current.forEach((unsub) => unsub());
    hostUnsubsRef.current = [];

    if (hostStreamRef.current) {
      hostStreamRef.current.getTracks().forEach((t) => t.stop());
      hostStreamRef.current = null;
    }

    if (id) {
      const broadcastDocRef = doc(db, 'broadcasts', id);
      await updateDoc(broadcastDocRef, { status: 'ended', endedAt: serverTimestamp() });
      const viewersSnap = await getDocs(collection(broadcastDocRef, 'viewers'));
      await Promise.all(viewersSnap.docs.map((d) => updateDoc(d.ref, { status: 'closed' })));

    }

    if (currentUser) {
      updateDoc(doc(db, 'users', currentUser.uid), {
        isLive: false,
        liveBroadcastId: null,
      }).catch(() => { });
    }

    broadcastIdRef.current = null;
    setHostStream(null);
    setIsBroadcasting(false);
    setViewerCount(0);
  }, [currentUser]);

  const startBroadcast = useCallback(
    async ({ fps }: StartBroadcastConfig): Promise<void> => {
      if (!currentUser) return;

      try {
        setHostError(null);

        const videoConstraints = {
          ...QUALITY_PRESETS[fps],
        };

        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: videoConstraints,
          audio: true,
        });

        hostStreamRef.current = stream;
        setHostStream(stream);
        setHostFps(fps);

        const broadcastPayload: BroadcastDoc = {
          hostId: currentUser.uid,
          hostName: currentUser.displayName || currentUser.email || 'Usuário',
          fps,
          status: 'live',
          createdAt: serverTimestamp(),
        };
        const broadcastRef = await addDoc(collection(db, 'broadcasts'), broadcastPayload);
        broadcastIdRef.current = broadcastRef.id;
        setIsBroadcasting(true);

        await setDoc(
          doc(db, 'users', currentUser.uid),
          { isLive: true, liveBroadcastId: broadcastRef.id },
          { merge: true }
        );

        // Se o usuário encerrar pelo controle nativo do navegador ("Parar de compartilhar")
        const [videoTrack] = stream.getVideoTracks();
        if (videoTrack) {
          videoTrack.onended = () => {
            stopBroadcast();
          };
        }

        // Escuta novos pedidos de espectadores e cria uma conexão para cada um
        const viewersCol = collection(broadcastRef, 'viewers');
        const unsub = onSnapshot(viewersCol, (snap) => {
          console.log('snap =>', snap.docs.filter((d) => (d.data() as ViewerDoc).status !== 'closed'))
          setViewerCount(
            snap.docs.filter((d) => (d.data() as ViewerDoc).status !== 'closed').length
          );
          snap.docChanges().forEach((change) => {
            const viewerId = change.doc.id;
            const data = change.doc.data() as ViewerDoc;
            if (change.type === 'added' && data.status === 'requested') {
              connectToViewer(broadcastRef.id, viewerId);
            }
            if (data.status === 'closed' && hostPeersRef.current[viewerId]) {
              hostPeersRef.current[viewerId].close();
              delete hostPeersRef.current[viewerId];
            }
          });
        });
        hostUnsubsRef.current.push(unsub);
      } catch (err) {
        const domError = err as DOMException;
        if (domError.name !== 'NotAllowedError') {
          setHostError(domError.message || 'Não foi possível iniciar a transmissão.');
        }
      }
    },
    [currentUser, connectToViewer, stopBroadcast]
  );

  // Muda a qualidade em tempo real. Como o MESMO track é enviado para todos os
  // espectadores, aplicar a constraint uma vez reflete automaticamente para todos.
  const changeHostQuality = useCallback((fps: FpsOption): void => {
    const [track] = hostStreamRef.current?.getVideoTracks() ?? [];
    if (track) {
      track.applyConstraints(QUALITY_PRESETS[fps]).catch((err: unknown) => {
        console.warn('Não foi possível aplicar a nova taxa de quadros em tempo real:', err);
      });
    }
    setHostFps(fps);
    if (broadcastIdRef.current) {
      updateDoc(doc(db, 'broadcasts', broadcastIdRef.current), { fps }).catch(() => { });
    }
  }, []);


  const cleanupViewer = useCallback((): void => {
    if (viewerPcRef.current) {
      viewerPcRef.current.close();
      viewerPcRef.current = null;
    }
    viewerUnsubsRef.current.forEach((unsub) => unsub());
    viewerUnsubsRef.current = [];
    setRemoteStream(null);
  }, []);

  const watchBroadcast = useCallback(
    async (targetUser: AppUser): Promise<void> => {
      if (!currentUser || !targetUser.liveBroadcastId) return;

      try {
        setViewerError(null);
        setBroadcastEnded(false);

        const bId = targetUser.liveBroadcastId;
        const broadcastDocRef = doc(db, 'broadcasts', bId);
        const viewerDocRef = doc(broadcastDocRef, 'viewers', currentUser.uid);

        const pc = new RTCPeerConnection(rtcConfig);
        viewerPcRef.current = pc;
        pc.ontrack = (event) => setRemoteStream(event.streams[0] ?? null);

        const viewerCandidatesCol = collection(viewerDocRef, 'viewerCandidates');
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            addDoc(viewerCandidatesCol, event.candidate.toJSON());
          }
        };

        const viewerPayload: ViewerDoc = {
          viewerId: currentUser.uid,
          viewerName: currentUser.displayName || currentUser.email || 'Usuário',
          status: 'requested',
          requestedAt: serverTimestamp(),
        };
        await setDoc(viewerDocRef, viewerPayload);

        const nextWatching: WatchingState = {
          broadcastId: bId,
          hostId: targetUser.uid,
          hostName: targetUser.displayName || targetUser.email || 'Usuário',
        };
        watchingRef.current = nextWatching;
        setWatching(nextWatching);

        const unsubViewerDoc = onSnapshot(viewerDocRef, async (snap) => {
          const data = snap.data() as ViewerDoc | undefined;
          if (!data?.offer || pc.currentRemoteDescription) return;

          await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await updateDoc(viewerDocRef, {
            answer: { type: answer.type, sdp: answer.sdp },
            status: 'answered',
          });
        });
        viewerUnsubsRef.current.push(unsubViewerDoc);

        const hostCandidatesCol = collection(viewerDocRef, 'hostCandidates');
        const unsubHostCandidates = onSnapshot(hostCandidatesCol, (snap) => {
          snap.docChanges().forEach((change) => {
            if (change.type === 'added') {
              pc.addIceCandidate(new RTCIceCandidate(change.doc.data() as RTCIceCandidateInit));
            }
          });
        });
        viewerUnsubsRef.current.push(unsubHostCandidates);

        // Detecta quando o apresentador encerra a transmissão
        const unsubBroadcast = onSnapshot(broadcastDocRef, (snap) => {
          const data = snap.data() as BroadcastDoc | undefined;
          if (data?.status === 'ended') {
            setBroadcastEnded(true);
            cleanupViewer();
          }
        });
        viewerUnsubsRef.current.push(unsubBroadcast);
      } catch (err) {
        const error = err as Error;
        setViewerError(error.message || 'Não foi possível assistir a transmissão.');
      }
    },
    [currentUser, cleanupViewer]
  );

  const stopWatching = useCallback(async (): Promise<void> => {
    const w = watchingRef.current;
    if (w && currentUser) {
      try {
        await updateDoc(doc(db, 'broadcasts', w.broadcastId, 'viewers', currentUser.uid), {
          status: 'closed',
        });
      } catch {
        // ignora se já não existir
      }
    }
    cleanupViewer();
    watchingRef.current = null;
    setWatching(null);
    setBroadcastEnded(false);
  }, [currentUser, cleanupViewer]);

  // Fecha o aviso de "transmissão encerrada" e limpa a tela do espectador
  const dismissEndedNotice = useCallback((): void => {
    setBroadcastEnded(false);
    watchingRef.current = null;
    setWatching(null);
  }, []);

  useEffect(() => {
    return () => {
      stopBroadcast();
      cleanupViewer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isBroadcasting,
    hostStream,
    hostFps,
    viewerCount,
    hostError,
    startBroadcast,
    stopBroadcast,
    changeHostQuality,
    watching,
    remoteStream,
    viewerError,
    broadcastEnded,
    watchBroadcast,
    stopWatching,
    dismissEndedNotice,
  };
}
