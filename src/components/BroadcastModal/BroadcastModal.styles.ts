import styled from 'styled-components';

export const FieldGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const FieldLabel = styled.span`
  display: block;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const HintText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: 0;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
