import { atom } from 'recoil';
import { Chat } from '../models';

export const myChats = atom<Chat[] | undefined>({
  key: 'myChats',
  default: undefined,
  dangerouslyAllowMutability: true,
});
