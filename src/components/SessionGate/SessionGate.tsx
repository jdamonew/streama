import { LogIn, PlusCircle, ScreenShare } from 'lucide-react';
import { Button, Card, Heading, Text } from '@design-system';
import { HeadingIcon, SubHeading } from '@/design-system/components/Typography';
import * as Styles from './SessionGate.styles';

export interface SessionGateProps {
  onCreateSession: () => void;
  onJoinSession: () => void;
  creatingSession: boolean;
  error: string | null;
}

export function SessionGate({
  onCreateSession,
  onJoinSession,
  creatingSession,
  error,
}: SessionGateProps) {
  return (
    <Card>
      <HeadingIcon icon={ScreenShare} iconType="square">
        <Heading level={2}>Comece uma transmissão</Heading>
        <SubHeading>
          Crie uma sessão ou ingresse em uma já existente para compartilhar e assistir telas.
        </SubHeading>
      </HeadingIcon>

      {error && (
        <Text tone="danger" small>
          {error}
        </Text>
      )}

      <Styles.OptionsGrid>
        <Styles.OptionCard>
          <Styles.OptionIcon>
            <PlusCircle size={28} />
          </Styles.OptionIcon>
          <h3>Criar sessão</h3>
          <p>Gere um código único e compartilhe com quem você quer que participe.</p>
          <Button
            variant="primary"
            fullWidth
            onClick={onCreateSession}
            loading={creatingSession}
            disabled={creatingSession}
          >
            Criar sessão
          </Button>
        </Styles.OptionCard>

        <Styles.OptionCard>
          <Styles.OptionIcon>
            <LogIn size={28} />
          </Styles.OptionIcon>
          <h3>Ingressar em sessão</h3>
          <p>Já tem um código? Entre em uma sessão que outra pessoa criou.</p>
          <Button variant="secondary" fullWidth onClick={onJoinSession} disabled={creatingSession}>
            Ingressar em sessão
          </Button>
        </Styles.OptionCard>
      </Styles.OptionsGrid>
    </Card>
  );
}
