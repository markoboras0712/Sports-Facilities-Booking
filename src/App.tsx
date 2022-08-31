import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { FirebaseProvider, useFirestoreListeners } from 'modules/firebase';
import { Routing } from 'modules/routing';
import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {
  useFirestoreListeners();
  const theme = responsiveFontSizes(createTheme());

  return (
    <ThemeProvider theme={theme}>
      <FirebaseProvider>
        <Routing />
        <ToastContainer position="bottom-left" />
      </FirebaseProvider>
    </ThemeProvider>
  );
};
