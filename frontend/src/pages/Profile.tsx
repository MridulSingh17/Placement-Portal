import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface User {
  name: string;
  email: string;
  role: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/api/auth/profile');
        setUser(res.data.user);
        setEmail(res.data.user.email);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');
      await axiosInstance.patch('/api/profile/email', { email });
      setMessage('Email updated successfully');
      setUser((prev) => (prev ? { ...prev, email } : prev));
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Failed to update email');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500 text-xl">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6 text-center text-red-500">Failed to load profile.</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="space-y-4 text-lg">
        <p><strong>Name:</strong> {user.name}</p>
        <p>
          <strong>Email:</strong>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ml-2 px-2 py-1 border rounded text-base w-full"
          />
        </p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Update Email'}
      </button>
      {message && (
        <div className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Profile;
