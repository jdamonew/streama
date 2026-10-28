import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
export const Caption = styled.p`
  margin: 4px 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;
export const Grid = styled.div<{ $expanded: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;
export const Tile = styled.div<{ $expanded: boolean }>`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #111;
  cursor: pointer;
  grid-column: ${({ $expanded }) => ($expanded ? '1 / -1' : 'auto')};
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
  }
`;
export const TileLabel = styled.div`
  position: absolute;
  inset: auto 0 0;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: white;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
`;
export const ExpandIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 12px;
  color: white;
  background: #0008;
  padding: 8px;
  border-radius: 50%;
  display: flex;
`;
export const UserTile = styled.div`
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
`;
export const UserStatus = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
`;
