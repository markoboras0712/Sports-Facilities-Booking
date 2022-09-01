import { DefaultValue, selector } from 'recoil';
import { OnboardingData } from '../models';
import { settingsAtoms } from './atoms';

const {
  addressAtom,
  avatarAtom,
  cityAtom,
  countryAtom,
  firstNameAtom,
  isOnboardingInProgressAtom,
  lastNameAtom,
  postalCodeAtom,
  activeChatsAtom,
} = settingsAtoms;

const settings = selector<OnboardingData | null>({
  key: 'authorization.user',
  get: ({ get }) => {
    const settings: OnboardingData = {
      avatar: get(avatarAtom),
      firstName: get(firstNameAtom),
      lastName: get(lastNameAtom),
      address: get(addressAtom),
      country: get(countryAtom),
      city: get(cityAtom),
      postalCode: get(postalCodeAtom),
      isOnboardingInProgress: get(isOnboardingInProgressAtom),
      activeChats: get(activeChatsAtom),
    };
    return settings;
  },
  set: ({ set }, onboardingData) => {
    if (onboardingData && !(onboardingData instanceof DefaultValue)) {
      set(avatarAtom, onboardingData.avatar);
      set(firstNameAtom, onboardingData.firstName);
      set(lastNameAtom, onboardingData.lastName);
      set(addressAtom, onboardingData.address);
      set(countryAtom, onboardingData.country);
      set(cityAtom, onboardingData.city);
      set(postalCodeAtom, onboardingData.postalCode);
      set(isOnboardingInProgressAtom, onboardingData.isOnboardingInProgress);
      set(activeChatsAtom, onboardingData.activeChats);
    }
  },
});

const settingsCleanup = selector({
  key: 'authorization.cleanup',
  get: () => null,
  set: ({ reset }) => {
    reset(firstNameAtom);
    reset(lastNameAtom);
    reset(avatarAtom);
    reset(addressAtom);
    reset(countryAtom);
    reset(cityAtom);
    reset(postalCodeAtom);
    reset(isOnboardingInProgressAtom);
    reset(activeChatsAtom);
  },
});

export const settingsSelector = {
  settings,
  settingsCleanup,
};
