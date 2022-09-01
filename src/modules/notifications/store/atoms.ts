import { atom } from 'recoil';
import { Notification } from '../models';

export const myNotifications = atom<Notification[] | undefined>({
  key: 'myNotifications',
  default: undefined,
  dangerouslyAllowMutability: true,
});
