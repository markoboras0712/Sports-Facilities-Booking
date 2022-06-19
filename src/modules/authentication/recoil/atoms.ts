import { FirebaseError } from 'firebase/app';
import { atom, DefaultValue, selector } from 'recoil';
import { User } from '../models';

const email = atom<string | null>({
  key: 'authentication.user.email',
  default: null,
});

const userUid = atom<string | null>({
  key: 'authentication.user.uid',
  default: null,
});

const creationTime = atom<string | undefined>({
  key: 'authentication.user.creationTime',
  default: undefined,
});

const user = selector<User | null>({
  key: 'authentication.user',
  get: ({ get }) => {
    const userData: User = {
      userUid: get(userUid),
      email: get(email),
      creationTime: get(creationTime),
    };
    return userData;
  },
  set: ({ set }, user) => {
    if (user && !(user instanceof DefaultValue)) {
      set(email, user.email);
      set(userUid, user.userUid);
      set(creationTime, user.creationTime);
    }
  },
});

const userCleanup = selector({
  key: 'authentication.logout',
  get: () => null,
  set: ({ reset }) => {
    reset(email);
    reset(userUid);
    reset(creationTime);
  },
});

const isLoggedIn = selector({
  key: 'authentication.isLoggedIn',
  get: ({ get }) => {
    if (get(email)) return true;
    if (get(email) === null) return false;

    return get(email);
  },
});

const loginError = atom<string | undefined>({
  key: 'authentication.loginError',
  default: undefined,
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

const registerError = atom<string | undefined>({
  key: 'authentication.registerError',
  default: undefined,
});

const setRegisterError = selector<FirebaseError['code'] | undefined>({
  key: 'authentication.setRegisterError',
  get: () => undefined,
  set: ({ set }, errorType) => {
    if (errorType && !(errorType instanceof DefaultValue)) {
      console.log({ errorType });

      if (errorType === 'auth/email-already-in-use')
        set(registerError, 'Email is already in use');
    }
  },
});

export const userAtoms = {
  user,
  userCleanup,
  isLoggedIn,
  loginError,
  registerError,
  setRegisterError,
  setLoginError,
};
