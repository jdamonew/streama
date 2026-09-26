import styled, { css } from 'styled-components';
import type { CardPadding } from './Card';

const paddingStyles = {
  sm: css`
    padding: ${({ theme }) => theme.spacing.md};
  `,
  md: css`
    padding: ${({ theme }) => theme.spacing.lg};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  `,
} satisfies Record<CardPadding, ReturnType<typeof css>>;

export const StyledCard = styled.div<{ $padding: CardPadding; $elevated: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ $elevated, theme }) => ($elevated ? theme.shadows.md : 'none')};
  ${({ $padding }) => paddingStyles[$padding]}
`;
