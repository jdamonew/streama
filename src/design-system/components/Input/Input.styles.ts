import styled from 'styled-components';

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-family: inherit;
  width: 100%;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
export const StyledInputPassword = styled(StyledInput)`
  border: none;
  padding-right: 0;
`;

export const ContainerInput = styled.div<{ $hasError: boolean }>`
  background-color: white;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.border)};

  svg{
    stroke: #75797d;
  }
`
export const ShowPasswordButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  display: flex;
  padding: 0 ${({ theme }) => theme.spacing.md};
`
