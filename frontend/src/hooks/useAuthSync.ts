import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../state/authAtom';

const useAuthSync = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    if (token && role && userId) {
      setAuth({
        isLoggedIn: true,
        token,
        role,
        userId,
      });
    }
  }, [setAuth]);
};

export default useAuthSync;
