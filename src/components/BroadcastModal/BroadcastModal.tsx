import { useState } from 'react';
import { Modal, Button, Heading, Text } from '@design-system';
import { QualitySelector } from '@/components/QualitySelector';
import { MonitorCog } from 'lucide-react';
import { HeadingIcon, SubHeading } from '@/design-system/components/Typography/Typography';

import type { FpsOption, StartBroadcastConfig } from '@/types/firestore';
import * as Styles from './BroadcastModal.styles';

export interface BroadcastModalProps {
  onCancel: () => void;
  onStart: (config: StartBroadcastConfig) => Promise<void>;
  error: string | null;
}

export function BroadcastModal({ onCancel, onStart, error }: BroadcastModalProps) {
  const [fps, setFps] = useState<FpsOption>(72030);
  const [starting, setStarting] = useState(false);

  async function handleStart(): Promise<void> {
    setStarting(true);
    await onStart({ fps });
    setStarting(false);
  }

  return (
    <Modal>
      <HeadingIcon icon={MonitorCog}>
        <Heading level={2}>
          Qualidade do Video
        </Heading>
        <SubHeading>
          Escolha a qualidade ideal para a sua conexão.
        </SubHeading>
      </HeadingIcon>

      <Styles.FieldGroup>
        <QualitySelector value={fps} onChange={setFps} disabled={starting} />

      </Styles.FieldGroup>

      {error && (
        <Text tone="danger" small>
          {error}
        </Text>
      )}

      <Styles.ModalActions>
        <Button variant="secondary" onClick={onCancel} disabled={starting}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleStart} disabled={starting}>
          {starting ? 'Iniciando...' : 'Iniciar transmissão'}
        </Button>
      </Styles.ModalActions>
    </Modal>
  );
}
