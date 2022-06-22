import { atom } from 'recoil';

export const emailAtom = atom<string | null>({
  key: 'authentication.user.email',
  default: null,
});

export const userUidAtom = atom<string | null>({
  key: 'authentication.user.uid',
  default: null,
});

export const creationTimeAtom = atom<string | undefined>({
  key: 'authentication.user.creationTime',
  default: undefined,
});

export const loginError = atom<string | undefined>({
  key: 'authentication.loginError',
  default: undefined,
});

export const registerError = atom<string | undefined>({
  key: 'authentication.registerError',
  default: undefined,
});

export const forgotPasswordError = atom<string | undefined>({
  key: 'authentication.forgotPasswordError',
  default: undefined,
});
