import type { ReactNode } from 'react';
import * as Styles from './Badge.styles';

export type BadgeVariant = 'live' | 'neutral';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  return <Styles.StyledBadge $variant={variant}>{children}</Styles.StyledBadge>;
}
