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
