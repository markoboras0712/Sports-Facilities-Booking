import { onAuthStateChanged } from 'firebase/auth';
import { settingsAtoms } from 'modules/authorization';
import { auth } from 'modules/firebase';
import { useSetRecoilState } from 'recoil';
import {
  getSettings,
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
  const settingsCleanup = useSetRecoilState(settingsAtoms.settingsCleanup);
  const setUser = useSetRecoilState(userAtoms.user);
  const setSettings = useSetRecoilState(settingsAtoms.settings);

  const autoLogin = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const settings = await getSettings(user.uid);
        if (settings) setSettings(settings);
        setUser({
          email: user.email,
          userUid: user.uid,
          creationTime: user.metadata.creationTime,
        });
      }
      if (!user) {
        userCleanup(null);
        settingsCleanup(null);
      }
      return unsubscribe;
    });
  };

  const registerWithEmailPassword = (email: string, password: string) =>
    signUpWithEmailPassword(email, password);

  const loginWithEmailPassword = (email: string, password: string) =>
    signInWithEmailPassword(email, password);
  const loginWithGoogle = () => signInWithGoogle();
  const loginWithFacebook = () => signInWithFacebook();

  const resetPassword = (email: string) => sendPasswordReset(email);
  const logoutUser = () => logout();

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
