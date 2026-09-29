import { useState } from 'react';
import { Check, Copy, KeyRound, RefreshCw } from 'lucide-react';
import { Button, Heading, Loading, Modal, Text } from '@design-system';
import { HeadingIcon, SubHeading } from '@/design-system/components/Typography';
import * as Styles from './CreateSessionModal.styles';

export interface CreateSessionModalProps {
  code: string | null;
  creating: boolean;
  regenerating: boolean;
  error: string | null;
  onRegenerate: () => Promise<void>;
  onClose: () => void;
}

export function CreateSessionModal({
  code,
  creating,
  regenerating,
  error,
  onRegenerate,
  onClose,
}: CreateSessionModalProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(): Promise<void> {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error('Erro ao copiar')
    }
  }

  return (
    <Modal>
      <HeadingIcon icon={KeyRound}>
        <Heading level={2}>Código da sessão</Heading>
        <SubHeading>Compartilhe esse código com seus amigos.</SubHeading>
      </HeadingIcon>

      <Styles.FieldGroup>
        {!code && !creating && error ? (
          <Text tone="danger" small>
            {error}
          </Text>
        ) : creating || !code ? (
          <Styles.LoadingRow>
            <Loading size="lg" />
          </Styles.LoadingRow>
        ) : (
          <>
            <Styles.CodeBox>
              <Styles.CodeText>{code}</Styles.CodeText>
            </Styles.CodeBox>

            <Styles.CodeActions>
              <Button variant="outline" onClick={handleCopy}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copiado!' : 'Copiar código'}
              </Button>
              <Button variant="outline" onClick={onRegenerate} loading={regenerating}>
                <RefreshCw size={16} />
                Gerar novo código
              </Button>
            </Styles.CodeActions>

            <Styles.HintText>
              Ao gerar um novo código, o anterior deixa de funcionar para quem ainda não
              ingressou.
            </Styles.HintText>
          </>
        )}
      </Styles.FieldGroup>

      {code && error && (
        <Text tone="danger" small>
          {error}
        </Text>
      )}

      <Styles.ModalActions>
        <Button variant="primary" onClick={onClose}>
          Concluir
        </Button>
      </Styles.ModalActions>
    </Modal>
  );
}
