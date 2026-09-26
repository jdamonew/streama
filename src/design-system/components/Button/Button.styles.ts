import styled, { css } from 'styled-components';
import type { ButtonSize, ButtonVariant } from './Button';

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.primaryOpacityLow};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.secondaryHover};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.onDanger};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.dangerHover};
    }
  `,
  outline: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.textSecondary};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textLink};
    border: none;
    text-decoration: underline;
    padding: 0;
  `,
  link: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textLinkClean};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    border: none;
    text-decoration: none;
    padding: 0;
  `,
} satisfies Record<ButtonVariant, ReturnType<typeof css>>;

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  `,
} satisfies Record<ButtonSize, ReturnType<typeof css>>;

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
