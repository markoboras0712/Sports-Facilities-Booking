import { atom } from 'recoil';
import { Chat, Message } from '../models';

export const myChats = atom<Chat[] | undefined>({
  key: 'myChats',
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const myMessages = atom<Message[] | undefined>({
  key: 'myMessages',
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const selectedChat = atom<Chat | undefined>({
  key: 'selectedChat',
  default: undefined,
  dangerouslyAllowMutability: true,
});
