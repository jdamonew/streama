import type { HTMLAttributes, ReactNode } from 'react';
import type { SpacingKey } from '../../theme/spacing';
import * as Styles from './Stack.styles';

export type StackDirection = 'row' | 'column';
export type StackAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch';
export type StackJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?: SpacingKey;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  children: ReactNode;
}

export function Stack({
  direction = 'column',
  gap = 'md',
  align = 'stretch',
  justify = 'flex-start',
  wrap = false,
  children,
  ...rest
}: StackProps) {
  return (
    <Styles.StyledStack
      $direction={direction}
      $gap={gap}
      $align={align}
      $justify={justify}
      $wrap={wrap}
      {...rest}
    >
      {children}
    </Styles.StyledStack>
  );
}
