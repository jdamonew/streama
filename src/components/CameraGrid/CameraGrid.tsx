import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, Maximize2, Minimize2 } from 'lucide-react';
import { Badge, Card, Heading } from '@design-system';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where, type Unsubscribe } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db, rtcConfig } from '@/firebase';
import type { AppUser } from '@/types/firestore';
import * as Styles from './CameraGrid.styles';

export interface CameraGridProps { currentUser: User; sessionId: string; stream: MediaStream | null; }

export function CameraGrid({ currentUser, sessionId, stream }: CameraGridProps) {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const peers = useRef<Record<string, RTCPeerConnection>>({});
  const unsubscribers = useRef<Record<string, Unsubscribe[]>>({});

  const closePeer = useCallback((id: string) => {
    peers.current[id]?.close();
    delete peers.current[id];
    unsubscribers.current[id]?.forEach((unsubscribe) => unsubscribe());
    delete unsubscribers.current[id];
    setRemoteStreams((current) => { const next = { ...current }; delete next[id.split('_')[0]]; delete next[id.split('_')[1]]; return next; });
  }, []);

  useEffect(() => {
    const usersQuery = query(collection(db, 'users'), where('currentSessionId', '==', sessionId));
    return onSnapshot(usersQuery, (snapshot) => setUsers(snapshot.docs.map((item) => item.data() as AppUser)));
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    const signals = collection(db, 'sessions', sessionId, 'cameraSignals');
    const unsubscribersLocal: Unsubscribe[] = [];

    // Recebe ofertas das câmeras e cria respostas WebRTC.
    const incomingQuery = query(signals, where('targetId', '==', currentUser.uid));
    unsubscribersLocal.push(onSnapshot(incomingQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const signalId = change.doc.id;
        if (change.type === 'removed') { closePeer(signalId); return; }
        const data = change.doc.data();
        if (!data.offer || peers.current[signalId]) return;
        const pc = new RTCPeerConnection(rtcConfig);
        peers.current[signalId] = pc;
        const perPeer: Unsubscribe[] = [];
        unsubscribers.current[signalId] = perPeer;
        pc.ontrack = (event) => setRemoteStreams((current) => ({ ...current, [data.ownerId]: event.streams[0] ?? new MediaStream([event.track]) }));
        pc.onicecandidate = (event) => { if (event.candidate) void addDoc(collection(db, 'sessions', sessionId, 'cameraSignals', signalId, 'calleeCandidates'), event.candidate.toJSON()); };
        const callerCandidates = collection(db, 'sessions', sessionId, 'cameraSignals', signalId, 'callerCandidates');
        perPeer.push(onSnapshot(callerCandidates, (items) => items.docChanges().forEach((candidate) => {
          if (candidate.type === 'added') void pc.addIceCandidate(candidate.doc.data() as RTCIceCandidateInit).catch(() => undefined);
        })));
        void pc.setRemoteDescription(data.offer).then(async () => {
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await updateDoc(doc(db, 'sessions', sessionId, 'cameraSignals', signalId), { answer: { type: answer.type, sdp: answer.sdp } });
        }).catch(() => closePeer(signalId));
      });
    }));

    // Cada câmera ativa publica uma conexão unidirecional para os demais membros.
    users.filter((user) => user.uid !== currentUser.uid).forEach((user) => {
      if (!stream || peers.current[`${currentUser.uid}_${user.uid}`]) return;
      const signalId = `${currentUser.uid}_${user.uid}`;
      const signalRef = doc(db, 'sessions', sessionId, 'cameraSignals', signalId);
      const pc = new RTCPeerConnection(rtcConfig);
      peers.current[signalId] = pc;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      const perPeer: Unsubscribe[] = [];
      unsubscribers.current[signalId] = perPeer;
      pc.onicecandidate = (event) => { if (event.candidate) void addDoc(collection(db, 'sessions', sessionId, 'cameraSignals', signalId, 'callerCandidates'), event.candidate.toJSON()); };
      const calleeCandidates = collection(db, 'sessions', sessionId, 'cameraSignals', signalId, 'calleeCandidates');
      perPeer.push(onSnapshot(calleeCandidates, (items) => items.docChanges().forEach((candidate) => {
        if (candidate.type === 'added') void pc.addIceCandidate(candidate.doc.data() as RTCIceCandidateInit).catch(() => undefined);
      })));
      const answerUnsubscribe = onSnapshot(signalRef, (snapshot) => {
        const answer = snapshot.data()?.answer;
        if (answer && !pc.currentRemoteDescription) void pc.setRemoteDescription(answer).catch(() => undefined);
      });
      perPeer.push(answerUnsubscribe);
      void pc.createOffer().then(async (offer) => {
        await pc.setLocalDescription(offer);
        await setDoc(signalRef, { ownerId: currentUser.uid, targetId: user.uid, offer: { type: offer.type, sdp: offer.sdp } });
      }).catch(() => closePeer(signalId));
    });

    return () => { unsubscribersLocal.forEach((unsubscribe) => unsubscribe()); };
  }, [sessionId, currentUser.uid, users, stream, closePeer]);

  // Ao desligar a câmera, remove os convites para que os espectadores fechem as conexões.
  useEffect(() => {
    if (stream) return;
    const ownSignals = query(collection(db, 'sessions', sessionId, 'cameraSignals'), where('ownerId', '==', currentUser.uid));
    void getDocs(ownSignals).then(async (snapshot) => {
      await Promise.all(snapshot.docs.map((item) => deleteDoc(item.ref)));
      Object.keys(peers.current).filter((id) => id.startsWith(`${currentUser.uid}_`)).forEach(closePeer);
    }).catch(() => undefined);
  }, [stream, sessionId, currentUser.uid, closePeer]);

  useEffect(() => () => { Object.keys(peers.current).forEach(closePeer); }, [closePeer]);

  const self = users.find((user) => user.uid === currentUser.uid);
  return <Card>
    <Styles.Header><div><Heading level={2}>Câmeras da sessão</Heading><Styles.Caption>Selecione uma câmera para ampliar.</Styles.Caption></div></Styles.Header>
    <Styles.Grid $expanded={expandedUser !== null}>
      {users.map((user) => {
        const isSelf = user.uid === currentUser.uid;
        const videoStream = isSelf ? stream : remoteStreams[user.uid];
        const expanded = expandedUser === user.uid;
        return <Styles.Tile key={user.uid} $expanded={expanded} onClick={() => setExpandedUser(expanded ? null : user.uid)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setExpandedUser(expanded ? null : user.uid); }} aria-label={expanded ? 'Voltar à grade de câmeras' : `Ampliar câmera de ${user.displayName || user.email || 'usuário'}`}>
          {videoStream && <video autoPlay muted playsInline ref={(node) => { if (node) node.srcObject = videoStream; }} />}
          {!videoStream && <Styles.CameraPlaceholder><Camera size={32} /><span>{user.cameraActive ? 'Conectando câmera…' : 'Câmera desligada'}</span></Styles.CameraPlaceholder>}
          <Styles.TileLabel><span>{isSelf ? self?.displayName || currentUser.displayName || currentUser.email || 'Você' : user.displayName || user.email || 'Usuário'}</span>{user.cameraActive && <Badge variant="live">● AO VIVO</Badge>}</Styles.TileLabel>
          <Styles.ExpandIcon>{expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}</Styles.ExpandIcon>
        </Styles.Tile>;
      })}
    </Styles.Grid>
  </Card>;
}
