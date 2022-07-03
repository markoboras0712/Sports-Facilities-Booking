import { navigate } from '@reach/router';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { settingsSelector } from 'modules/authorization';
import {
  auth,
  facebookProvider,
  googleProvider,
  useFirestore,
  useFirestoreUtilities,
} from 'modules/firebase';
import { Routes } from 'modules/routing';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userSelectors } from '../store';

export const useAuthentication = () => {
  const { getDocumentReference, setUserCollection } = useFirestoreUtilities();
  const { createUserWithSocialMedia, getSettings } = useFirestore();
  const userCleanup = useSetRecoilState(userSelectors.userCleanup);
  const settingsCleanup = useSetRecoilState(settingsSelector.settingsCleanup);
  const setUser = useSetRecoilState(userSelectors.user);
  const setSettings = useSetRecoilState(settingsSelector.settings);
  const setRegisterError = useSetRecoilState(userSelectors.setRegisterError);
  const setLoginError = useSetRecoilState(userSelectors.setLoginError);
  const setForgotPasswordError = useSetRecoilState(
    userSelectors.setForgotPasswordError,
  );

  const onUserAuthStateChange = useCallback(
    async (user: User | null) => {
      if (!user) {
        setUser({
          userUid: null,
          email: null,
          creationTime: undefined,
        });
        settingsCleanup(null);
        return;
      }

      const settings = await getSettings(user.uid);
      if (settings) setSettings(settings);
      setUser({
        email: user.email,
        userUid: user.uid,
        creationTime: user.metadata.creationTime,
      });
    },
    [setUser, userCleanup],
  );

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, onUserAuthStateChange);

    return () => {
      subscription();
    };
  }, [auth, onUserAuthStateChange]);

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
      const settingsDocumentReference = getDocumentReference(uid, 'settings');
      await setUserCollection(settingsDocumentReference, {
        email,
        creationTime,
        isOnboardingInProgress: true,
      });
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
      await createUserWithSocialMedia(user);
    } catch (error) {
      if (error instanceof FirebaseError) setLoginError(error.code);
    }
  };

  const loginWithFacebook = async () => {
    try {
      const { user } = await signInWithPopup(auth, facebookProvider);
      await createUserWithSocialMedia(user);
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
    registerWithEmailPassword,
    loginWithEmailPassword,
    resetPassword,
    loginWithGoogle,
    loginWithFacebook,
    logout,
  };
};
