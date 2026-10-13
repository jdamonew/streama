import { useEffect, useState } from 'react';
import { KeyRound, LogOut, MonitorPlay, MonitorX, RefreshCw, Users2 } from 'lucide-react';
import type { User } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { useBroadcast } from '@/hooks/useBroadcast';
import { useSession } from '@/hooks/useSession';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ActiveUsersList } from '@/components/ActiveUsersList';
import { BroadcastModal } from '@/components/BroadcastModal';
import { LiveBroadcastPanel } from '@/components/LiveBroadcastPanel';
import { WatchBroadcastView } from '@/components/WatchBroadcastView';
import { SessionGate } from '@/components/SessionGate';
import { CreateSessionModal } from '@/components/CreateSessionModal';
import { JoinSessionModal } from '@/components/JoinSessionModal';
import { DropdownUser } from '@/components/DropdownUser';
import { Avatar, Button, Card, Heading, Loading, Text } from '@design-system';
import { HeadingIcon, SubHeading } from '@/design-system/components/Typography';
import LogoStreama from '../../assets/logo.png';
import type { StartBroadcastConfig } from '@/types/firestore';
import * as Styles from './Dashboard.styles';
import { CircularCountdown } from '@/design-system/components/CircularCountdown';

export interface DashboardProps {
  currentUser: User;
}

export function Dashboard({ currentUser }: DashboardProps) {
  const { logout } = useAuth();
  const isMob = useIsMobile(460);

  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showCreateSessionModal, setShowCreateSessionModal] = useState(false);
  const [showJoinSessionModal, setShowJoinSessionModal] = useState(false);

  const {
    session,
    sessionLoading,
    creatingSession,
    joiningSession,
    regeneratingCode,
    sessionError,
    sessionClosedNotice,
    createSession,
    joinSession,
    regenerateCode,
    leaveSession,
    endSession,
    dismissClosedNotice,
  } = useSession(currentUser);

  const {
    isBroadcasting,
    hostStream,
    hostFps,
    viewerCount,
    hostError,
    startBroadcast,
    stopBroadcast,
    changeHostQuality,
    watching,
    remoteStream,
    viewerError,
    broadcastEnded,
    watchBroadcast,
    stopWatching,
    dismissEndedNotice,
  } = useBroadcast(currentUser);


  useEffect(() => {
    if (!session) {
      if (isBroadcasting) void stopBroadcast();
      if (watching) void stopWatching();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function handleStartBroadcast(config: StartBroadcastConfig): Promise<void> {
    await startBroadcast(config);
    setShowBroadcastModal(false);
  }

  function handleOpenCreateSession(): void {
    setShowCreateSessionModal(true);
    void createSession();
  }

  async function handleJoinSession(code: string): Promise<boolean> {
    return joinSession(code);
  }

  async function handleLeaveSession(): Promise<void> {
    if (isBroadcasting) await stopBroadcast();
    if (watching) await stopWatching();
    await leaveSession();
  }

  async function handleEndSession(): Promise<void> {
    if (isBroadcasting) await stopBroadcast();
    if (watching) await stopWatching();
    await endSession();
  }

  async function handleLogout(): Promise<void> {
    if (isBroadcasting) await stopBroadcast();
    if (watching) await stopWatching();
    await logout();
  }

  const displayName = currentUser.displayName || currentUser.email || 'Usuário';

  return (
    <Styles.DashboardWrapper>
      <Styles.DashboardHeader>
        <Styles.LogoContainer>
          <img src={LogoStreama} width={200} loading="lazy" alt="Logo Roxa da Streama" />
        </Styles.LogoContainer>

        <DropdownUser logOut={handleLogout} user={currentUser} name={displayName}>
          <Avatar src={currentUser.photoURL} name={displayName} size={50} />
        </DropdownUser>
      </Styles.DashboardHeader>

      {sessionClosedNotice && (
        <Styles.SectionSpacer>
          <Card>
            <Styles.AlertContainer>
              <HeadingIcon icon={MonitorX}>
                <Heading level={2}>
                  Sessão encerrada
                </Heading>
                <SubHeading>
                  O host encerrou a sessão.
                </SubHeading>
              </HeadingIcon>

              <Styles.CloseAlertContainer>
                <CircularCountdown
                  duration={20}
                  size={64}
                  strokeWidth={5}
                  onComplete={dismissClosedNotice}
                />
                <Button variant="secondary" size='sm' onClick={dismissClosedNotice}>
                  Fechar
                </Button>
              </Styles.CloseAlertContainer>
            </Styles.AlertContainer>

          </Card>
        </Styles.SectionSpacer>
      )}

      {sessionLoading && (
        <Styles.InitialLoadingWrapper>
          <Loading size="lg" />
        </Styles.InitialLoadingWrapper>
      )}

      {!sessionLoading && !session && (
        <SessionGate
          onCreateSession={handleOpenCreateSession}
          onJoinSession={() => setShowJoinSessionModal(true)}
          creatingSession={creatingSession}
          error={sessionError}
        />
      )}

      {session && (
        <>
          <Styles.SessionBar>
            <Styles.SessionBarInfo>
              {session.isHost ? (
                <>
                  <Text tone="secondary" small>
                    Código da sessão:
                  </Text>
                  <Styles.SessionCode onClick={() => setShowCreateSessionModal(true)}>
                    {session.code}
                  </Styles.SessionCode>
                </>
              ) : (
                <Text tone="secondary" small>
                  Você está na sessão de <strong>{session.hostName}</strong>
                </Text>
              )}
            </Styles.SessionBarInfo>

            <Styles.SessionBarActions>
              {session.isHost ? (
                <>
                  <Button variant="outline" onClick={() => setShowCreateSessionModal(true)}>
                    <KeyRound size={16} />
                    {!isMob && 'Ver código'}
                  </Button>
                  <Button variant="danger" onClick={handleEndSession}>
                    <RefreshCw size={16} />
                    {!isMob && 'Encerrar sessão'}
                  </Button>
                </>
              ) : (
                <Button variant="danger" onClick={handleLeaveSession}>
                  <LogOut size={16} />
                  {!isMob && 'Sair da sessão'}
                </Button>
              )}
            </Styles.SessionBarActions>
          </Styles.SessionBar>

          {(hostError || viewerError) && (
            <Styles.SectionSpacer>
              <Text tone="danger" small>
                {hostError || viewerError}
              </Text>
            </Styles.SectionSpacer>
          )}

          {isBroadcasting && (
            <Styles.SectionSpacer>
              <LiveBroadcastPanel
                stream={hostStream}
                fps={hostFps}
                viewerCount={viewerCount}
                onChangeQuality={changeHostQuality}
                onStop={stopBroadcast}
              />
            </Styles.SectionSpacer>
          )}

          {watching && (
            <Styles.SectionSpacer>
              <WatchBroadcastView
                watching={watching}
                remoteStream={remoteStream}
                broadcastEnded={broadcastEnded}
                onStop={stopWatching}
                onDismissEnded={dismissEndedNotice}
              />
            </Styles.SectionSpacer>
          )}

          {!isBroadcasting && (
            <Card>
              <Styles.PanelHeaderRow>
                <HeadingIcon icon={Users2} iconType="square">
                  <Heading level={2}>Usuários na sessão</Heading>
                  <SubHeading>Acompanhe quem ingressou nesta sessão.</SubHeading>
                </HeadingIcon>
                <Button variant="secondary" onClick={() => setShowBroadcastModal(true)}>
                  <MonitorPlay size={24} color="#5d2ad9" />
                  {!isMob && 'Iniciar Transmissão'}
                </Button>
              </Styles.PanelHeaderRow>
              <ActiveUsersList
                currentUser={currentUser}
                sessionId={session.sessionId}
                onWatch={watchBroadcast}
                disabled={!!watching}
              />
            </Card>
          )}

          {showBroadcastModal && (
            <BroadcastModal
              onCancel={() => setShowBroadcastModal(false)}
              onStart={handleStartBroadcast}
              error={hostError}
            />
          )}
        </>
      )}

      {showCreateSessionModal && (
        <CreateSessionModal
          code={session?.code ?? null}
          creating={creatingSession}
          regenerating={regeneratingCode}
          error={sessionError}
          onRegenerate={regenerateCode}
          onClose={() => setShowCreateSessionModal(false)}
        />
      )}

      {showJoinSessionModal && (
        <JoinSessionModal
          onCancel={() => setShowJoinSessionModal(false)}
          onJoin={handleJoinSession}
          joining={joiningSession}
          error={sessionError}
        />
      )}
    </Styles.DashboardWrapper>
  );
}
