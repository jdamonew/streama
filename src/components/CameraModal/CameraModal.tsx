import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';
import { Button, Heading, Modal, Text } from '@design-system';
import {
  HeadingIcon,
  SubHeading,
} from '@/design-system/components/Typography/Typography';
import * as Styles from './CameraModal.styles';

export interface CameraModalProps {
  onCancel: () => void;
  onStart: (stream: MediaStream) => void;
  error?: string | null;
}

export function CameraModal({ onCancel, onStart, error }: CameraModalProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState('');
  const [preview, setPreview] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(true);
  const [deviceError, setDeviceError] = useState<string | null>(null);
  const accepted = useRef(false);

  useEffect(() => {
    let active = true;
    let stream: MediaStream | null = null;
    async function loadCamera() {
      setLoading(true);
      setDeviceError(null);
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: deviceId ? { deviceId: { exact: deviceId } } : true,
          audio: false,
        });
        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        setPreview(stream);
        const available = (
          await navigator.mediaDevices.enumerateDevices()
        ).filter((device) => device.kind === 'videoinput');
        setDevices(available);
        if (!deviceId && available[0]) setDeviceId(available[0].deviceId);
      } catch (cause) {
        if (active)
          setDeviceError(
            (cause as Error).message || 'Não foi possível acessar a câmera.',
          );
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadCamera();
    return () => {
      active = false;
      if (!accepted.current)
        stream?.getTracks().forEach((track) => track.stop());
    };
  }, [deviceId]);

  return (
    <Modal width={620}>
      <HeadingIcon icon={Camera}>
        <Heading level={2}>Abrir câmera</Heading>
        <SubHeading>Escolha o dispositivo que deseja compartilhar.</SubHeading>
      </HeadingIcon>
      <Styles.DeviceField>
        <label htmlFor="camera-device">Dispositivo</label>
        <select
          id="camera-device"
          value={deviceId}
          onChange={(event) => setDeviceId(event.target.value)}
          disabled={!devices.length || loading}
        >
          {!devices.length && (
            <option value="">Nenhuma câmera encontrada</option>
          )}
          {devices.map((device, index) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Câmera ${index + 1}`}
            </option>
          ))}
        </select>
      </Styles.DeviceField>
      <Styles.Preview>
        {preview && (
          <video
            autoPlay
            muted
            playsInline
            ref={(node) => {
              if (node) node.srcObject = preview;
            }}
          />
        )}
        {loading && <Text tone="secondary">Conectando à câmera…</Text>}
        {!loading && !preview && <CameraOff size={36} />}
      </Styles.Preview>
      {(deviceError || error) && (
        <Text tone="danger" small>
          {deviceError || error}
        </Text>
      )}
      <Styles.Actions>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          onClick={() => {
            if (preview) {
              accepted.current = true;
              onStart(preview);
            }
          }}
          disabled={!preview || loading}
        >
          <Camera size={16} /> Abrir câmera
        </Button>
      </Styles.Actions>
    </Modal>
  );
}
