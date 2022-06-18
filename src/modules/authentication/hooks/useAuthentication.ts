import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'modules/firebase';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithFacebook,
  signInWithGoogle,
  signUpWithEmailPassword,
  userAtoms,
} from '../recoil';

export const useAuthentication = () => {
  const userCleanup = useSetRecoilState(userAtoms.userCleanup);
  const setUser = useSetRecoilState(userAtoms.user);
  const user = useRecoilValue(userAtoms.user);
  console.log('recoil user', user);

  const autoLogin = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          email: user.email,
          userUid: user.uid,
          creationTime: user.metadata.creationTime,
        });
      }
      if (!user) {
        userCleanup(null);
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
    console.log('login with google');

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
