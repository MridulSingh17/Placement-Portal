import { atom } from 'recoil';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  role: string | null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    token: null,
    role: null,
  },
});
