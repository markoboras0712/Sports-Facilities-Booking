import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { FirebaseProvider } from 'modules/firebase';
import { Routing } from 'modules/routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

export const App: React.FC = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <FirebaseProvider>
        <Routing />
        <ToastContainer position="bottom-left" />
      </FirebaseProvider>
    </ThemeProvider>
  );
};
