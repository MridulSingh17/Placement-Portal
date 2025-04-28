import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosinstance from '../api/axiosInstance';
import Mait_logo from '/Mait_Logo.png';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosinstance.post('/api/auth/register', form); 
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
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
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          
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
          
          <div className="relative">
            <select
              name="role"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleChange}
              value={form.role}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Register;
