import styled from 'styled-components';

export const UsersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const UsersListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

export const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap:${({ theme }) => theme.spacing.sm} ;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.primaryOpacityLow};
  
  svg{
    stroke: ${({ theme }) => theme.colors.primary};
  }
`
