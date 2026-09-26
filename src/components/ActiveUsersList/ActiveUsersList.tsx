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
  onWatch: (user: AppUser) => void;
  disabled: boolean;
}

export function ActiveUsersList({ currentUser, onWatch, disabled }: ActiveUsersListProps) {
  const { openBroadcast } = useSound();

  const [users, setUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('online', '==', true));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs
        .map((d) => d.data() as AppUser)
        .filter((u) => u.uid !== currentUser.uid);
      // usuários transmitindo aparecem primeiro
      list.sort((a, b) => Number(b.isLive) - Number(a.isLive));
      setUsers(list);
      if (list[0].isLive) openBroadcast()
    });

    return unsub;
  }, [currentUser]);

  if (users.length === 0) {
    return (
      <Styles.EmptyState>

        <Styles.ImageContainer>
          <UserRoundGroup size={32} />
        </Styles.ImageContainer>
        <Heading level={2}>
          Nenhum usuário ativo no momento.
        </Heading>
        <SubHeading>
          Quando alguem estiver utilizando o Streama, ele aparecerá aqui.
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
