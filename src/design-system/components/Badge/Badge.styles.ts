import styled, { css } from 'styled-components';
import type { BadgeVariant } from './Badge';

const variantStyles = {
  live: css`
    color: ${({ theme }) => theme.colors.live};
  `,
  neutral: css`
    color: ${({ theme }) => theme.colors.textMuted};
  `,
} satisfies Record<BadgeVariant, ReturnType<typeof css>>;

export const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: 0.03em;
  ${({ $variant }) => variantStyles[$variant]}
`;
