import { useEffect, useRef, useState } from 'react';
import { Button, Card } from '@design-system';
import { CinemaModal } from '@/components/CinemaModal';
import type { WatchingState } from '@/types/firestore';
import * as Styles from './WatchBroadcastView.styles';

export interface WatchBroadcastViewProps {
  watching: WatchingState;
  remoteStream: MediaStream | null;
  broadcastEnded: boolean;
  onStop: () => void;
  onDismissEnded: () => void;
}

export function WatchBroadcastView({
  watching,
  remoteStream,
  broadcastEnded,
  onStop,
  onDismissEnded,
}: WatchBroadcastViewProps) {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  function goFullscreen(): void {
    videoRef.current?.requestFullscreen?.();
  }

  return (
    <Card>
      <Styles.PanelHeader>
        <span>
          Assistindo: <strong>{watching.hostName}</strong>
        </span>
        <Styles.PanelButtons>
          {/* <Button variant="outline" onClick={() => setShowModal(true)} disabled={broadcastEnded}>
            Modo Cinema
          </Button> */}
          <Button variant="outline" onClick={goFullscreen} disabled={broadcastEnded}>
            Tela cheia
          </Button>
          <Button variant="danger" onClick={onStop}>
            Sair
          </Button>
        </Styles.PanelButtons>
      </Styles.PanelHeader>

      <Styles.VideoWrapper>
        <Styles.StyledVideo ref={videoRef} autoPlay playsInline />

        {broadcastEnded && (
          <Styles.EndedOverlay>
            <p>📴 A transmissão foi encerrada pelo apresentador.</p>
            <Button variant="primary" onClick={onDismissEnded}>
              Fechar
            </Button>
          </Styles.EndedOverlay>
        )}

        {showModal && (
          <CinemaModal
            onCancel={() => setShowModal(false)}
            host={watching}
            remoteStream={remoteStream}
            broadcastEnded={broadcastEnded}
            onDismissEnded={onDismissEnded}
          />
        )}

      </Styles.VideoWrapper>
    </Card>
  );
}
