import { FirebaseError } from 'firebase/app';
import { DefaultValue, selector } from 'recoil';
import { User } from '../models';
import {
  creationTimeAtom,
  emailAtom,
  forgotPasswordError,
  loginError,
  registerError,
  userUidAtom,
} from './atoms';

const user = selector<User | null>({
  key: 'authentication.user',
  get: ({ get }) => {
    const userData: User = {
      userUid: get(userUidAtom),
      email: get(emailAtom),
      creationTime: get(creationTimeAtom),
    };
    return userData;
  },
  set: ({ set }, user) => {
    if (user && !(user instanceof DefaultValue)) {
      set(emailAtom, user.email);
      set(userUidAtom, user.userUid);
      set(creationTimeAtom, user.creationTime);
    }
  },
});

const userCleanup = selector({
  key: 'authentication.logout',
  get: () => null,
  set: ({ reset }) => {
    reset(emailAtom);
    reset(userUidAtom);
    reset(creationTimeAtom);
  },
});

const isLoggedIn = selector({
  key: 'authentication.isLoggedIn',
  get: ({ get }) => {
    if (get(emailAtom)) return true;
    if (get(emailAtom) === null) return false;

    return get(emailAtom);
  },
});

const setLoginError = selector<FirebaseError['code'] | undefined>({
  key: 'authentication.setLoginError',
  get: () => undefined,
  set: ({ set }, errorType) => {
    if (errorType && !(errorType instanceof DefaultValue)) {
      console.log({ errorType });

      if (errorType === 'auth/wrong-password')
        set(loginError, 'Wrong password');

      if (errorType === 'auth/cancelled-popup-request')
        set(loginError, 'Login cancelled');

      if (errorType === 'auth/account-exists-with-different-credential')
        set(loginError, 'Account exists with different credential');

      if (errorType === 'auth/user-not-found')
        set(loginError, 'User not found');
    }
  },
});

const loginErrorCleanup = selector({
  key: 'authentication.loginErrorCleanup',
  get: () => null,
  set: ({ reset }) => {
    reset(loginError);
  },
});

const setRegisterError = selector<FirebaseError['code'] | undefined>({
  key: 'authentication.setRegisterError',
  get: () => undefined,
  set: ({ set }, errorType) => {
    if (errorType && !(errorType instanceof DefaultValue)) {
      if (errorType === 'auth/email-already-in-use')
        set(registerError, 'Email is already in use');
    }
  },
});

const registerErrorCleanup = selector({
  key: 'authentication.registerErrorCleanup',
  get: () => null,
  set: ({ reset }) => {
    reset(registerError);
  },
});

const setForgotPasswordError = selector<FirebaseError['code'] | undefined>({
  key: 'authentication.setForgotPasswordError',
  get: () => undefined,
  set: ({ set }, errorType) => {
    if (errorType && !(errorType instanceof DefaultValue)) {
      if (errorType === 'auth/user-not-found')
        set(forgotPasswordError, 'User not found');
    }
  },
});

const forgotPasswordErrorCleanup = selector({
  key: 'authentication.forgotPasswordErrorCleanup',
  get: () => null,
  set: ({ reset }) => {
    reset(forgotPasswordError);
  },
});

export const userSelectors = {
  user,
  userCleanup,
  isLoggedIn,
  loginError,
  registerError,
  setRegisterError,
  setLoginError,
  loginErrorCleanup,
  forgotPasswordError,
  setForgotPasswordError,
  forgotPasswordErrorCleanup,
  registerErrorCleanup,
};
