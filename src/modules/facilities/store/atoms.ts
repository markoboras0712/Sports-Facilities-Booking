import { atom } from 'recoil';
import { Facility } from '../models';

export const myFacilities = atom<Facility[] | undefined>({
  key: 'myFacilities',
  default: undefined,
  dangerouslyAllowMutability: true,
});
