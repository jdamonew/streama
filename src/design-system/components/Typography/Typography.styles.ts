import styled, { css } from 'styled-components';
import type { HeadingLevel, IconType, TextTone } from './Typography';

const headingSizes = {
  1: css`
    font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  `,
  2: css`
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  `,
  3: css`
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  `,
} satisfies Record<HeadingLevel, ReturnType<typeof css>>;

const iconForm = {
  circle: css`
    border-radius: ${({ theme }) => theme.radii.pill};
  `,
  square: css`
    border-radius: ${({ theme }) => theme.radii.md};
  `,
} satisfies Record<IconType, ReturnType<typeof css>>;

export const StyledHeading = styled.h1<{ $level: HeadingLevel, $color?: string }>`
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme, $color }) => $color ? $color : theme.colors.textPrimary};
  ${({ $level }) => headingSizes[$level]};
  `;

export const StyledSubHeading = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 0px;
  margin-bottom: 0;
  `;

export const StyledHeadingIcon = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

`
export const HeadIcon = styled.div<{ $iconType?: IconType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width:60px;
  height:60px;
  background-color: ${({ theme }) => theme.colors.primaryOpacityLow};
  ${({ $iconType }) => $iconType ? iconForm[$iconType] : iconForm['circle']};

  svg{
    stroke: ${({ theme }) => theme.colors.primary};
  }
`

export const HeadChildren = styled.div`
  display: flex;
  flex-direction: column;
`

const toneStyles = {
  primary: css`
    color: ${({ theme }) => theme.colors.textPrimary};
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.textSecondary};
  `,
  muted: css`
    color: ${({ theme }) => theme.colors.textMuted};
  `,
  danger: css`
    color: ${({ theme }) => theme.colors.danger};
  `,
  online: css`
    color: ${({ theme }) => theme.colors.online};
  `,
} satisfies Record<TextTone, ReturnType<typeof css>>;

export const StyledText = styled.p<{ $tone: TextTone; $small: boolean }>`
  margin: 0;
  font-size: ${({ theme, $small }) =>
    $small ? theme.typography.fontSizes.sm : theme.typography.fontSizes.md};
  ${({ $tone }) => toneStyles[$tone]}
`;
