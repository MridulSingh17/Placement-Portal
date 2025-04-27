import { useRecoilState } from 'recoil';
import { authState } from '../state/authAtom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setAuth({
      isLoggedIn: false,
      token: '',
      role: '',
      userId: '',
    });
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        Placement Portal
      </div>
      <div className="space-x-4">
        {auth.isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
