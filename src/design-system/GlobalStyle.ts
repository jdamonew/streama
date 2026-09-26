import { createGlobalStyle } from 'styled-components';

/**
 * Estilos globais que dependem diretamente dos tokens do tema.
 * Fundamentos "estáticos" (reset de box-sizing, margin/padding, etc.)
 * ficam em `src/styles/globals.scss`, que não precisa de acesso ao tema.
 */
export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  }

  button {
    font-family: inherit;
  }

  a {
    color: ${({ theme }) => theme.colors.textLink};
  }
`;
