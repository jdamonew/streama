import styled, { css } from 'styled-components';
import { StatusProps } from './Avatar';


const statusColor = {
  online: css`
    background-color: green;
  `,
  ausente: css`
    background-color: orange;
  `,
  offline: css`
    background-color: gray;
  `
} satisfies Record<StatusProps, ReturnType<typeof css>>;

export const StyledAvatarImage = styled.img<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: ${({ theme }) => theme.radii.pill};
  object-fit: cover;
`;

export const StyledAvatarContainer = styled.div`
  display: inline-flex;
  position: relative;
`;

export const StyledAvatarPlaceholder = styled.div<{ $size: number }>`
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
    font-size: ${$size / 2.2}px;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

export const StyledStatus = styled.div<{ $status?: StatusProps }>`
  width: 15px;
  height: 15px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 2px solid white;
  position: absolute;
  bottom: 0;
  right: 0;
   ${({ $status }) => $status && statusColor[$status]}
  
`