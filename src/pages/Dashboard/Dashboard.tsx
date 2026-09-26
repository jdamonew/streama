import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useBroadcast } from '@/hooks/useBroadcast';
import { ActiveUsersList } from '@/components/ActiveUsersList';
import { BroadcastModal } from '@/components/BroadcastModal';
import { LiveBroadcastPanel } from '@/components/LiveBroadcastPanel';
import { WatchBroadcastView } from '@/components/WatchBroadcastView';
import { Avatar, Button, Card, Heading, Text } from '@design-system';
import { MonitorPlay, Users2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DropdownUser } from '@/components/DropdownUser';
import { HeadingIcon, SubHeading } from '@/design-system/components/Typography';
import LogoStreama from '../../assets/logo.png';
import type { User } from 'firebase/auth';
import type { StartBroadcastConfig } from '@/types/firestore';
import * as Styles from './Dashboard.styles';


export interface DashboardProps {
  currentUser: User;
}

export function Dashboard({ currentUser }: DashboardProps) {
  const { logout } = useAuth();
  const isMob = useIsMobile(460);

  const [showModal, setShowModal] = useState(false);

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

  async function handleStart(config: StartBroadcastConfig): Promise<void> {
    await startBroadcast(config);
    setShowModal(false);
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
          <img src={LogoStreama} width={200} loading='lazy' alt='Logo Roxa da Streama' />
        </Styles.LogoContainer>

        <DropdownUser logOut={handleLogout} user={currentUser} name={displayName}>
          <Avatar
            src={currentUser.photoURL}
            name={displayName}
            // status={currentUser.status}
            // user={userProfile}
            size={50} />
        </DropdownUser>

      </Styles.DashboardHeader>

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
            <HeadingIcon icon={Users2} iconType='square'>
              <Heading level={2}>Usuários ativos</Heading>
              <SubHeading>Acompanhe quem está utilizando o Streama neste momento.</SubHeading>
            </HeadingIcon>
            <Button variant="secondary" onClick={() => setShowModal(true)}>
              <MonitorPlay size={24} color="#5d2ad9" />
              {!isMob && 'Iniciar Transmissão'}
            </Button>
          </Styles.PanelHeaderRow>
          <ActiveUsersList
            currentUser={currentUser}
            onWatch={watchBroadcast}
            disabled={!!watching}
          />
        </Card>
      )}

      {showModal && (
        <BroadcastModal
          onCancel={() => setShowModal(false)}
          onStart={handleStart}
          error={hostError}
        />
      )}
    </Styles.DashboardWrapper>
  );
}
