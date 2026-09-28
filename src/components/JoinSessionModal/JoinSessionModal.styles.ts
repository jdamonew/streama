import styled from 'styled-components';

export const FieldGroup = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export const CodeInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  letter-spacing: 0.3em;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    letter-spacing: normal;
    text-transform: none;
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;
