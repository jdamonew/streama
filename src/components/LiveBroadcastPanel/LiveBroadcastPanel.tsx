import { useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import { Badge, Button, Card, Text } from '@design-system';
import { QualityTagSelector } from '@/components/QualitySelector';
import type { FpsOption } from '@/types/firestore';
import * as Styles from './LiveBroadcastPanel.styles';
import { useSound } from '@/hooks/useSound';

export interface LiveBroadcastPanelProps {
  stream: MediaStream | null;
  fps: FpsOption;
  viewerCount: number;
  onChangeQuality: (fps: FpsOption) => void;
  onStop: () => void;
  onOpenCamera: () => void;
}

export function LiveBroadcastPanel({
  stream,
  fps,
  viewerCount,
  onChangeQuality,
  onStop,
  onOpenCamera,
}: LiveBroadcastPanelProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { openBroadcast, viewerBroadcast } = useSound();

  useEffect(() => {
    if (viewerCount > 0) {
      viewerBroadcast();
    }
  }, [viewerCount]);

  useEffect(() => {
    console.log(videoRef.current?.srcObject);
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      openBroadcast();
    }
  }, [stream]);

  return (
    <Card>
      <Styles.PanelHeader>
        <Badge variant="live">● Você está transmitindo</Badge>
        <Text tone="secondary" small>
          {viewerCount}{' '}
          {viewerCount === 1 ? 'pessoa assistindo' : 'pessoas assistindo'}
        </Text>
      </Styles.PanelHeader>

      <Styles.VideoWrapper>
        <Styles.StyledVideo ref={videoRef} autoPlay muted playsInline />
      </Styles.VideoWrapper>

      <Styles.PanelControls>
        <QualityTagSelector value={fps} onChange={onChangeQuality} />
        <Styles.PanelButtons>
          <Button variant="outline" onClick={onOpenCamera}>
            <Camera size={16} /> Abrir câmera
          </Button>
          <Button variant="danger" onClick={onStop}>
            Encerrar transmissão
          </Button>
        </Styles.PanelButtons>
      </Styles.PanelControls>
    </Card>
  );
}
