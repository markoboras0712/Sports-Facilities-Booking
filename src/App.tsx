import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { authSelectors } from 'modules/authentication';
import { FirebaseProvider, useFirestore } from 'modules/firebase';
import { Routing } from 'modules/routing';
import * as React from 'react';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from 'recoil';

export const App: React.FC = () => {
  const user = useRecoilValue(authSelectors.user);
  const { getMyNotifications, getMyFacilities } = useFirestore();
  const theme = responsiveFontSizes(createTheme());

  useEffect(() => {
    if (!user?.userUid) return;

    getMyNotifications(user.userUid);
    getMyFacilities(user.userUid);
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <FirebaseProvider>
        <Routing />
        <ToastContainer position="bottom-left" />
      </FirebaseProvider>
    </ThemeProvider>
  );
};
