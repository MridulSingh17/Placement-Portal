import { useRecoilState } from 'recoil';
import { authState } from '../state/authAtom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Mait_logo from '/Mait_Logo.png';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/auth/login', form);
      const { token, user } = res.data;

      localStorage.setItem('token', token);

      setAuth({
        isLoggedIn: true,
        token,
        role: user.role,
        userId: user.id,
      });

      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className='flex flex-col justify-center items-center gap-1 w-full'>
        <div className="mb-8">
          <img 
            src={Mait_logo} 
            alt="Mait Logo" 
            className="w-32 mx-auto" 
          />
        </div>

        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Welcome</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
              
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Log In
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
