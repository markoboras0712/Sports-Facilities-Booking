import { atom } from 'recoil';
import { Facility } from '../models';

export const myFacilities = atom<Facility[] | undefined>({
  key: 'myFacilities',
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const availableFacilities = atom<Facility[] | undefined>({
  key: 'availableFacilities',
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const selectedFacility = atom<Facility | null>({
  key: 'selectedFacility',
  default: null,
  dangerouslyAllowMutability: true,
});

export const searchFacilityInput = atom<string>({
  key: 'searchFacilityInput',
  default: '',
  dangerouslyAllowMutability: true,
});

export const searchDateInput = atom<Date | null>({
  key: 'searchDateInput',
  default: new Date(),
  dangerouslyAllowMutability: true,
});
