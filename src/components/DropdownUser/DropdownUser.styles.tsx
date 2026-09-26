import styled from "styled-components";

export const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0 12px;
`;