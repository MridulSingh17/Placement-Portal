import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../state/authAtom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useRecoilValue(authState);

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
