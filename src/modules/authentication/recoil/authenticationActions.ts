import { navigate } from '@reach/router';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, facebookProvider, googleProvider } from 'modules/firebase';
import { Routes } from 'modules/routing';
import { createNewUser } from './authenticationUtils';

export const signUpWithEmailPassword = async (
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
  } catch (error) {
    console.log('SIGN-UP ERROR', { error });
    throw new Error('Didng signup');
  }
};

export const signInWithEmailPassword = async (
  email: string,
  password: string,
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate(Routes.AvailableObjects);
  } catch (error) {
    alert(error);
    throw new Error('Didnt sign in');
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    navigate(Routes.Login);
  } catch (error) {
    alert(error);
    throw new Error('didnt send password reset');
  }
};

export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    await createNewUser(user);
  } catch (err) {
    alert(err);
    throw new Error('Didnt sign in');
  }
};

export const signInWithFacebook = async () => {
  try {
    const { user } = await signInWithPopup(auth, facebookProvider);
    await createNewUser(user);
  } catch (err) {
    alert(err);
    throw new Error('Didnt sign in');
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    navigate(Routes.Login);
  } catch (error) {
    throw new Error('didnt logout');
  }
};
