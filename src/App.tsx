import React from 'react';
import { Routing } from 'modules/routing';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { FirebaseAuthProvider } from 'modules/authentication';

export const App: React.FC = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <FirebaseAuthProvider>
        <Routing />
      </FirebaseAuthProvider>
    </ThemeProvider>
  );
};
