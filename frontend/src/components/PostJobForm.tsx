import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const PostJobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not authorized');
        return;
      }

      await axiosInstance.post('/api/jobs', formData, {
        headers: { Authorization: `Bearer ${token}` }, 
      });

      alert('Job Posted Successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to post job', err);
      alert('Failed to post job');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required className="p-2 border" />
        <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required className="p-2 border" />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="p-2 border" />
        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required className="p-2 border" />
        <input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} required className="p-2 border" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJobForm;
