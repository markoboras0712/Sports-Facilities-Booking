import { navigate } from '@reach/router';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes } from 'modules/routing';
import {
  auth,
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithFacebook,
  signInWithGoogle,
  signUpWithEmailPassword,
} from '../recoil';

export const useAuthentication = () => {
  const autoLogin = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log({ user });
      }
      if (!user) {
        console.log('no user');
      }
      return unsubscribe;
    });
  };

  const registerWithEmailPassword = (email: string, password: string) => {
    return signUpWithEmailPassword(email, password);
  };

  const loginWithEmailPassword = (email: string, password: string) => {
    return signInWithEmailPassword(email, password);
  };

  const loginWithGoogle = () => {
    signInWithGoogle();
  };

  const loginWithFacebook = () => {
    signInWithFacebook();
  };

  const resetPassword = (email: string) => {
    sendPasswordReset(email);
  };

  const logoutUser = () => {
    logout();
    navigate(Routes.Login);
  };

  return {
    autoLogin,
    registerWithEmailPassword,
    loginWithEmailPassword,
    resetPassword,
    loginWithGoogle,
    loginWithFacebook,
    logoutUser,
  };
};
