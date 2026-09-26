import { forwardRef } from 'react';

import * as Styles from './Avatar.styles';

export type StatusProps = 'online' | 'ausente' | 'offline'

export interface AvatarProps {
  src?: string | null;
  name: string;
  size?: number;
  status?: StatusProps;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, name, size = 40, status }, ref) => {
    const initial = (name || '?').charAt(0).toUpperCase();

    return (
      <Styles.StyledAvatarContainer ref={ref}>
        {src ? (
          <Styles.StyledAvatarImage
            src={src}
            alt={name}
            $size={size}
            loading='lazy'
          />
        ) : (
          <Styles.StyledAvatarPlaceholder $size={size}>
            {initial}
          </Styles.StyledAvatarPlaceholder>
        )}

        {
          status &&
          <Styles.StyledStatus></Styles.StyledStatus>
        }

      </Styles.StyledAvatarContainer>
    );
  },
);

Avatar.displayName = 'Avatar';