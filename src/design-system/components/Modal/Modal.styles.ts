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
  /* width: 50%; */
`;

export const StyledModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 540px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;
