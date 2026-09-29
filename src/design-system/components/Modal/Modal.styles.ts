import styled from 'styled-components';

export const StyledModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.modal};
  /* width: 100%; */
  `;

export const StyledModalContent = styled.div<{ $width?: number }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ $width }) => $width ? $width : 540}px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  /* max-width: 850px; */
`;
