import { useEffect, useState } from 'react';
import { UserRoundGroup } from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { Avatar, Badge, Button, Heading, Text } from '@design-system';
import { SubHeading } from '@/design-system/components/Typography/Typography';
import { useSound } from '@/hooks/useSound';
import type { User } from 'firebase/auth';
import type { AppUser } from '@/types/firestore';
import * as Styles from './ActiveUsersList.styles';

export interface ActiveUsersListProps {
  currentUser: User;
  sessionId: string;
  onWatch: (user: AppUser) => void;
  disabled: boolean;
}

export function ActiveUsersList({ currentUser, sessionId, onWatch, disabled }: ActiveUsersListProps) {
  const { openBroadcast } = useSound();

  const [users, setUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('currentSessionId', '==', sessionId));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs
        .map((d) => d.data() as AppUser)
        .filter((u) => u.uid !== currentUser.uid);

      list.sort((a, b) => Number(b.isLive) - Number(a.isLive));
      setUsers(list);
      if (list[0]?.isLive) openBroadcast()
    });

    return unsub;
  }, [currentUser, sessionId]);

  if (users.length === 0) {
    return (
      <Styles.EmptyState>

        <Styles.ImageContainer>
          <UserRoundGroup size={32} />
        </Styles.ImageContainer>
        <Heading level={2}>
          Nenhum outro usuário nesta sessão ainda.
        </Heading>
        <SubHeading>
          Compartilhe o código da sessão para outras pessoas ingressarem.
        </SubHeading>

      </Styles.EmptyState>
    );
  }

  return (
    <Styles.UsersList>
      {users.map((user) => (
        <Styles.UsersListItem key={user.uid}>
          <Styles.UserInfoRow>
            <Avatar src={user.photoURL} name={user.displayName || user.email || '?'} />
            <div>
              <div>{user.displayName || user.email}</div>
              {user.isLive && <Badge variant="live">● AO VIVO</Badge>}
            </div>
          </Styles.UserInfoRow>

          {user.isLive ? (
            <Button variant="primary" disabled={disabled} onClick={() => onWatch(user)}>
              Assistir
            </Button>
          ) : (
            <Text tone="online" small>
              ● Online
            </Text>
          )}
        </Styles.UsersListItem>
      )
      )}
    </Styles.UsersList>
  );
}
