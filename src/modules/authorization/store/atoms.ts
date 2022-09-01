import { atom } from 'recoil';
import { getRandomOptions } from '../hooks';
import { AvatarData } from '../models';

const avatarAtom = atom<AvatarData | undefined>({
  key: 'authorization.user.avatar',
  default: getRandomOptions(),
});

const firstNameAtom = atom<string | null>({
  key: 'authorization.user.firstName',
  default: null,
});

const lastNameAtom = atom<string | null>({
  key: 'authorization.user.lastName',
  default: null,
});

const addressAtom = atom<string | null>({
  key: 'authorization.user.address',
  default: null,
});

const countryAtom = atom<string | undefined>({
  key: 'authorization.user.country',
  default: undefined,
});

const cityAtom = atom<string | undefined>({
  key: 'authorization.user.city',
  default: undefined,
});

const postalCodeAtom = atom<string | undefined>({
  key: 'authorization.user.postalCode',
  default: undefined,
});

const isOnboardingInProgressAtom = atom<boolean>({
  key: 'authorization.user.isOnboardingInProgress',
  default: true,
});

const activeChatsAtom = atom<string[] | null>({
  key: 'authorization.user.activeChats',
  default: [],
});

export const settingsAtoms = {
  avatarAtom,
  firstNameAtom,
  addressAtom,
  countryAtom,
  cityAtom,
  postalCodeAtom,
  isOnboardingInProgressAtom,
  lastNameAtom,
  activeChatsAtom,
};
