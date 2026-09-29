import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '@design-system';
import { MantineProvider } from '@mantine/core';

import './styles/globals.scss';
import '@mantine/core/styles.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Elemento #root não encontrado em index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MantineProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </MantineProvider>
  </React.StrictMode>
);
