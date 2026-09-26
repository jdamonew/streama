import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
`;

export const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const LogoContainer = styled.div`

`;
export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
`;

export const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PanelHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SectionSpacer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
