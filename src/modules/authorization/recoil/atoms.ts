import { atom, DefaultValue, selector } from 'recoil';
import { AvatarData, OnboardingData } from '../models';

const avatar = atom<AvatarData | undefined>({
  key: 'authorization.user.avatar',
  default: undefined,
});

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

const settings = selector<OnboardingData | null>({
  key: 'authorization.user',
  get: ({ get }) => {
    const settings: OnboardingData = {
      avatar: get(avatar),
      firstName: get(firstName),
      lastName: get(lastName),
      address: get(address),
      country: get(country),
      city: get(city),
      postalCode: get(postalCode),
    };
    return settings;
  },
  set: ({ set }, onboardingData) => {
    if (onboardingData && !(onboardingData instanceof DefaultValue)) {
      set(avatar, onboardingData.avatar);
      set(firstName, onboardingData.firstName);
      set(lastName, onboardingData.lastName);
      set(address, onboardingData.address);
      set(country, onboardingData.country);
      set(city, onboardingData.city);
      set(postalCode, onboardingData.postalCode);
    }
  },
});

const settingsCleanup = selector({
  key: 'authentication.cleanup',
  get: () => null,
  set: ({ reset }) => {
    reset(firstName);
    reset(lastName);
    reset(avatar);
    reset(address);
    reset(country);
    reset(city);
    reset(postalCode);
  },
});

export const settingsAtoms = {
  settings,
  settingsCleanup,
};
