import { atom } from 'jotai';

interface UserInfo {
  name?: string;
  age?: number;
  permission: string[];
  [key: string]: any;
}

export const atomUserInfo = atom<UserInfo>({
  permission: [],
});

export const atomUserPermission = atom<string[]>((get) => {
  return get(atomUserInfo).permission || [];
});

export const atomNoticeCount = atom<number>((get) => {
  return get(atomUserInfo).unread || 0;
});
