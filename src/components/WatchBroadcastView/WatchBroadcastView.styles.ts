import styled from 'styled-components';

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PanelButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const VideoWrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`;

export const StyledVideo = styled.video`
  width: 100%;
  max-height: 480px;
  display: block;
  background: ${({ theme }) => theme.colors.black};
`;

export const EndedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlayStrong};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;
