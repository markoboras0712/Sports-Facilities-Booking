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

const registerError = atom<string | undefined>({
  key: 'authentication.registerError',
  default: undefined,
});

export const userAtoms = {
  user,
  userCleanup,
  isLoggedIn,
  loginError,
  registerError,
};
