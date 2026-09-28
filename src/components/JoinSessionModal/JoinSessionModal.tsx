import { useState, type FormEvent } from 'react';
import { LogIn } from 'lucide-react';
import { Button, Heading, Modal, Text } from '@design-system';
import { HeadingIcon, SubHeading } from '@/design-system/components/Typography';
import * as Styles from './JoinSessionModal.styles';

export interface JoinSessionModalProps {
  onCancel: () => void;
  onJoin: (code: string) => Promise<boolean>;
  joining: boolean;
  error: string | null;
}

export function JoinSessionModal({ onCancel, onJoin, joining, error }: JoinSessionModalProps) {
  const [code, setCode] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const success = await onJoin(code);
    if (success) {
      onCancel();
    }
  }

  return (
    <Modal>
      <HeadingIcon icon={LogIn}>
        <Heading level={2}>Ingressar em sessão</Heading>
        <SubHeading>Digite o código de 6 caracteres que você recebeu.</SubHeading>
      </HeadingIcon>

      <form onSubmit={handleSubmit}>
        <Styles.FieldGroup>
          <Styles.CodeInput
            type="text"
            placeholder="XXXXXX"
            maxLength={6}
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            $hasError={!!error}
            disabled={joining}
          />
        </Styles.FieldGroup>

        {error && (
          <Text tone="danger" small>
            {error}
          </Text>
        )}

        <Styles.ModalActions>
          <Button type="button" variant="secondary" onClick={onCancel} disabled={joining}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" loading={joining} disabled={joining}>
            Ingressar
          </Button>
        </Styles.ModalActions>
      </form>
    </Modal>
  );
}
