import { atom } from 'recoil';
import { getRandomOptions } from '../hooks';
import { AvatarData } from '../models';

export const avatarAtom = atom<AvatarData | undefined>({
  key: 'authorization.user.avatar',
  default: getRandomOptions(),
});

export const firstNameAtom = atom<string | null>({
  key: 'authorization.user.firstName',
  default: null,
});

export const lastNameAtom = atom<string | null>({
  key: 'authorization.user.lastName',
  default: null,
});

export const addressAtom = atom<string | null>({
  key: 'authorization.user.address',
  default: null,
});

export const countryAtom = atom<string | undefined>({
  key: 'authorization.user.country',
  default: undefined,
});

export const cityAtom = atom<string | undefined>({
  key: 'authorization.user.city',
  default: undefined,
});

export const postalCodeAtom = atom<string | undefined>({
  key: 'authorization.user.postalCode',
  default: undefined,
});

export const isOnboardingInProgressAtom = atom<boolean>({
  key: 'authorization.user.isOnboardingInProgress',
  default: true,
});
