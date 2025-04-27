import { atom } from 'recoil';

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  role: string;
  userId: string; 
}

const defaultAuthState: AuthState = {
  isLoggedIn: false,
  token: '',
  role: '',
  userId: '',
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: defaultAuthState,
});
