import { WatchingState } from '@/types/firestore';
import { useEffect, useRef } from 'react';
import { EndedOverlay } from '../WatchBroadcastView/WatchBroadcastView.styles';
import { Button } from '@/design-system';
import * as Styles from './CinemaModal.styles';

export interface CinemaModalProps {
    host: WatchingState;
    remoteStream: MediaStream | null;
    broadcastEnded: boolean;
    onDismissEnded: () => void;
    onCancel: () => void
}

export function CinemaModal({ onCancel, host, remoteStream, broadcastEnded, onDismissEnded }: CinemaModalProps) {

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = remoteStream || null;
        }
    }, [remoteStream]);

    if (!host) return null;

    // function goFullscreen() {
    //     if (videoRef.current?.requestFullscreen) {
    //         videoRef.current.requestFullscreen();
    //     }
    // }

    return (
        <Styles.CinemaModal>
            <Styles.CinemaCardModal>
                <h2>Transmissão de {host.hostName}</h2>

                <video ref={videoRef} autoPlay playsInline className="watch-video-cinema" />

                {broadcastEnded && (
                    <EndedOverlay>
                        <p>📴 A transmissão foi encerrada pelo apresentador.</p>
                        <Button variant="primary" onClick={onDismissEnded}>
                            Fechar
                        </Button>
                    </EndedOverlay>
                )}

                <Styles.CinemaModalActions>
                    <Button variant="primary" onClick={onCancel}>
                        Cancelar
                    </Button>
                </Styles.CinemaModalActions>
            </Styles.CinemaCardModal>
        </Styles.CinemaModal>
    );
}
