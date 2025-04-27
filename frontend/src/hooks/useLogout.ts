import { useResetRecoilState } from 'recoil';
import { authState } from '../state/authAtom';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const resetAuth = useResetRecoilState(authState);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    resetAuth();
    navigate('/login');
  };

  return logout;
};

export default useLogout;
