import { navigate } from '@reach/router';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { settingsAtoms } from 'modules/authorization';
import { auth, db, facebookProvider, googleProvider } from 'modules/firebase';
import { Routes } from 'modules/routing';
import { useSetRecoilState } from 'recoil';
import { createNewUser, getSettings, userAtoms } from '../recoil';

export const useAuthentication = () => {
  const userCleanup = useSetRecoilState(userAtoms.userCleanup);
  const settingsCleanup = useSetRecoilState(settingsAtoms.settingsCleanup);
  const setUser = useSetRecoilState(userAtoms.user);
  const setSettings = useSetRecoilState(settingsAtoms.settings);
  const setRegisterError = useSetRecoilState(userAtoms.setRegisterError);
  const setLoginError = useSetRecoilState(userAtoms.setLoginError);
  const setForgotPasswordError = useSetRecoilState(
    userAtoms.setForgotPasswordError,
  );

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

  const registerWithEmailPassword = async (
    email1: string,
    password: string,
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email1,
        password,
      );
      const {
        email,
        metadata: { creationTime },
        uid,
      } = response.user;
      const newUserRef = doc(db, uid, 'settings');
      await setDoc(newUserRef, { email, creationTime });
      navigate(Routes.Onboarding);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) setRegisterError(error.code);
    }
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(Routes.AvailableObjects);
    } catch (error) {
      if (error instanceof FirebaseError) setLoginError(error.code);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await createNewUser(user);
    } catch (error) {
      if (error instanceof FirebaseError) setLoginError(error.code);
    }
  };

  const loginWithFacebook = async () => {
    try {
      const { user } = await signInWithPopup(auth, facebookProvider);
      await createNewUser(user);
    } catch (error) {
      if (error instanceof FirebaseError) setLoginError(error.code);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      navigate(Routes.Login);
    } catch (error) {
      if (error instanceof FirebaseError) setForgotPasswordError(error.code);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      navigate(Routes.Login);
    } catch (error) {
      if (error instanceof FirebaseError) setRegisterError(error.code);
    }
  };

  return {
    autoLogin,
    registerWithEmailPassword,
    loginWithEmailPassword,
    resetPassword,
    loginWithGoogle,
    loginWithFacebook,
    logout,
  };
};
