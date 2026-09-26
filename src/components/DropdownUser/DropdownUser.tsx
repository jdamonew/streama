import { Avatar, Text } from '@/design-system';
import { Menu } from '@mantine/core';
import { LogOut } from 'lucide-react';
import { ReactElement } from 'react';
import type { User } from 'firebase/auth';
import * as Styles from './DropdownUser.styles';

export interface DropdownUserProps {
    children: ReactElement
    logOut: () => void
    user: User
    name: string
}

export function DropdownUser({ children, logOut, user, name }: DropdownUserProps) {
    // const { statusUpdate } = useAuth()
    return (
        <Menu shadow="md" width={250}>
            <Menu.Target>
                <span>
                    {children}
                </span>
            </Menu.Target>

            <Menu.Dropdown>
                <Styles.UserInfoRow>
                    <Avatar src={user.photoURL} name={name} />
                    <div>
                        <strong>{name}</strong>
                        <Text tone="secondary" small>
                            {user.email}
                        </Text>
                    </div>
                </Styles.UserInfoRow>
                <Menu.Divider />
                {/* <Menu.Item leftSection={<LogOut size={15} strokeWidth={2.25} />} onClick={() => statusUpdate('ausente')}>
                    Alterar Status
                </Menu.Item> */}
                <Menu.Item leftSection={<LogOut size={15} strokeWidth={2.25} />} onClick={logOut}>
                    Sair
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}