import { atom, DefaultValue, selector } from 'recoil';
import { OnboardingData } from '../models';

const firstName = atom<string | null>({
  key: 'authorization.user.firstName',
  default: null,
});

const lastName = atom<string | null>({
  key: 'authorization.user.lastName',
  default: null,
});

const address = atom<string | null>({
  key: 'authorization.user.address',
  default: null,
});

const country = atom<string | undefined>({
  key: 'authorization.user.country',
  default: undefined,
});

const city = atom<string | undefined>({
  key: 'authorization.user.city',
  default: undefined,
});

const postalCode = atom<string | undefined>({
  key: 'authorization.user.postalCode',
  default: undefined,
});

const userSettings = selector<OnboardingData | null>({
  key: 'authorization.user',
  get: ({ get }) => {
    const userSettings: OnboardingData = {
      firstName: get(firstName),
      lastName: get(lastName),
      address: get(address),
      country: get(country),
      city: get(city),
      postalCode: get(postalCode),
    };
    return userSettings;
  },
  set: ({ set }, onboardingData) => {
    if (onboardingData && !(onboardingData instanceof DefaultValue)) {
      set(firstName, onboardingData.firstName);
      set(lastName, onboardingData.lastName);
      set(address, onboardingData.address);
      set(country, onboardingData.country);
      set(city, onboardingData.city);
      set(postalCode, onboardingData.postalCode);
    }
  },
});

export const settingsAtoms = {
  userSettings,
};
