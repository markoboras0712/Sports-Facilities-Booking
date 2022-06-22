import { DefaultValue, selector } from 'recoil';
import { OnboardingData } from '../models';
import {
  addressAtom,
  avatarAtom,
  cityAtom,
  countryAtom,
  firstNameAtom,
  lastNameAtom,
  postalCodeAtom,
} from './atoms';

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
    }
  },
});

const settingsCleanup = selector({
  key: 'authentication.cleanup',
  get: () => null,
  set: ({ reset }) => {
    reset(firstNameAtom);
    reset(lastNameAtom);
    reset(avatarAtom);
    reset(addressAtom);
    reset(countryAtom);
    reset(cityAtom);
    reset(postalCodeAtom);
  },
});

export const settingsAtoms = {
  settings,
  settingsCleanup,
};
