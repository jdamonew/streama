import type { HTMLAttributes, ReactNode } from 'react';
import * as Styles from './Card.styles';

export type CardPadding = 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  elevated?: boolean;
  children: ReactNode;
}

export function Card({ padding = 'md', elevated = false, children, ...rest }: CardProps) {
  return (
    <Styles.StyledCard $padding={padding} $elevated={elevated} {...rest}>
      {children}
    </Styles.StyledCard>
  );
}
