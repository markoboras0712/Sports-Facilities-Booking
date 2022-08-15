import { useToast } from 'shared/hooks';
import { FirebaseError } from 'firebase/app';
import { navigate } from '@reach/router';
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authSelectors } from '../store';
import { getLoginErrorMessage, getRegisterErrorMessage } from '../utils';
import { Routes } from 'modules/routing';
import { settingsSelector } from 'modules/authorization';
import { useFirestore } from 'modules/firebase';

/**
 * Use Firebase Authentication Hook
 * @name useAuthentication
 * @description Hook that is used for Firebase Authentication. With this hook you can create user with email and password
 * , login user with email and password, login user with Facebook, login user with Google, logout user, send password reset email.
 */

export function useAuthentication() {
  const auth = useMemo(getAuth, []);
  const googleProvider = useMemo(() => new GoogleAuthProvider(), []);
  const facebookProvider = useMemo(() => new FacebookAuthProvider(), []);
  const settingsCleanup = useSetRecoilState(settingsSelector.settingsCleanup);
  const [user, setUser] = useRecoilState(authSelectors.user);
  const { errorToast, successToast } = useToast();
  const { getSettings } = useFirestore();
  const setSettings = useSetRecoilState(settingsSelector.settings);

  /**
   * Create new account with email and password
   * @name register
   * @description Function that creates new firebase account in Firebase Authentication.
   */

  async function register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      successToast('You have successfully registered!');
    } catch (error) {
      if (error instanceof FirebaseError)
        errorToast(getRegisterErrorMessage(error.code));
    }
  }

  /**
   * Login user with email and password
   * @name login
   * @description Function that logins user who has previously created account.
   */

  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      successToast('You are logged in successfully!');
    } catch (error) {
      if (error instanceof FirebaseError)
        errorToast(getLoginErrorMessage(error.code));
    }
  }

  /**
   * Logout user
   * @name logout
   * @description Function that logouts currently logged user.
   */

  async function logout() {
    await signOut(auth)
      .then(() => {
        navigate(Routes.Login);
        successToast('You have logged out successfully!');
      })
      .catch((error: FirebaseError) =>
        errorToast('Something went wrong. Please try again.' + error.message),
      );
  }

  /**
   * Send forgot password link to user email
   * @name resetPassword
   * @description Function that sends reset password link to user email.
   */

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate(Routes.Login);
        successToast(
          'Check your email. Reset password mail has been sent successfully!',
        );
      })
      .catch((error: FirebaseError) =>
        errorToast(getLoginErrorMessage(error.code)),
      );
  }

  /**
   * Create new account or login user with Google
   * @name loginWithGoogle
   * @description Function that creates new firebase account in Firebase Authentication or logs in user with Google Provider.
   */

  async function loginWithGoogle() {
    try {
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, googleProvider);
      successToast('You are logged in successfully using Google!');
    } catch (error) {
      if (error instanceof FirebaseError)
        errorToast(getLoginErrorMessage(error.code));
    }
  }

  /**
   * Create new account or login user with Facebook
   * @name loginWithFacebook
   * @description Function that creates new firebase account in Firebase Authentication or logs in user with Facebook Provider.
   * Set app in Facebook Developers, read firebase docs.
   */

  async function loginWithFacebook() {
    try {
      facebookProvider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, facebookProvider);
      successToast('You are logged in successfully using Facebook!');
    } catch (error) {
      if (error instanceof FirebaseError)
        errorToast(getLoginErrorMessage(error.code));
    }
  }

  /**
   * Function that is used as a callback for Firebase Auth onAuthStateChanged event.
   * @name onUserAuthStateChange
   * @description Function that is used as a callback inside of onAuthStateChanged to subscribe and get if user is logged in or not.
   */

  const onUserAuthStateChange = useCallback(
    async (user: User | null) => {
      if (!user) {
        setUser({
          email: null,
          userUid: null,
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
    [setUser, user],
  );

  useEffect(() => {
    const subscription = auth.onAuthStateChanged(onUserAuthStateChange);

    return subscription;
  }, [auth, onUserAuthStateChange]);

  return {
    register,
    logout,
    login,
    resetPassword,
    loginWithGoogle,
    loginWithFacebook,
  };
}
