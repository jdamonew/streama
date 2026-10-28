import { useEffect, useRef, useState } from 'react';
import { Camera, Maximize2, Minimize2 } from 'lucide-react';
import { Avatar, Badge, Card, Heading } from '@design-system';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '@/firebase';
import type { AppUser } from '@/types/firestore';
import * as Styles from './CameraGrid.styles';

export interface CameraGridProps {
  currentUser: User;
  sessionId: string;
  stream: MediaStream;
}

export function CameraGrid({
  currentUser,
  sessionId,
  stream,
}: CameraGridProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);
  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      where('currentSessionId', '==', sessionId),
    );
    return onSnapshot(q, (snap) =>
      setUsers(snap.docs.map((item) => item.data() as AppUser)),
    );
  }, [sessionId]);
  const self = users.find((user) => user.uid === currentUser.uid);
  const others = users.filter((user) => user.uid !== currentUser.uid);
  return (
    <Card>
      <Styles.Header>
        <div>
          <Heading level={2}>Câmeras da sessão</Heading>
          <Styles.Caption>Selecione uma câmera para ampliar.</Styles.Caption>
        </div>
      </Styles.Header>
      <Styles.Grid $expanded={expanded}>
        <Styles.Tile
          $expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ')
              setExpanded(!expanded);
          }}
          aria-label={expanded ? 'Voltar à grade de câmeras' : 'Ampliar câmera'}
        >
          <video ref={videoRef} autoPlay muted playsInline />
          <Styles.TileLabel>
            <span>
              {self?.displayName ||
                currentUser.displayName ||
                currentUser.email ||
                'Você'}
            </span>
            <Badge variant="live">● AO VIVO</Badge>
          </Styles.TileLabel>
          <Styles.ExpandIcon>
            {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </Styles.ExpandIcon>
        </Styles.Tile>
        {!expanded &&
          others.map((user) => (
            <Styles.UserTile key={user.uid}>
              <Avatar
                src={user.photoURL}
                name={user.displayName || user.email || '?'}
                size={56}
              />
              <span>{user.displayName || user.email || 'Usuário'}</span>
              <Styles.UserStatus>
                {user.cameraActive ? (
                  <>
                    <Camera size={14} /> câmera ligada
                  </>
                ) : (
                  'Aguardando câmera'
                )}
              </Styles.UserStatus>
            </Styles.UserTile>
          ))}
      </Styles.Grid>
    </Card>
  );
}
