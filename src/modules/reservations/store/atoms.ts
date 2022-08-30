import { atom } from 'recoil';
import { Reservation } from '../models';

export const myReservations = atom<Reservation[] | undefined>({
  key: 'myReservations',
  default: undefined,
  dangerouslyAllowMutability: true,
});
