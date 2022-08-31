import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { authSelectors } from 'modules/authentication';
import {
  FirebaseProvider,
  useFirebaseFunctions,
  useFirestore,
} from 'modules/firebase';
import { Routing } from 'modules/routing';
import * as React from 'react';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from 'recoil';

export const App: React.FC = () => {
  const user = useRecoilValue(authSelectors.user);
  const { getMyNotifications, getMyFacilities, getMyReservations } =
    useFirestore();
  const { getFacilities } = useFirebaseFunctions();
  const theme = responsiveFontSizes(createTheme());

  useEffect(() => {
    if (!user?.userUid) return;

    getMyNotifications(user.userUid);
    getMyReservations(user.userUid);
    getMyFacilities(user.userUid);
    getFacilities();
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
