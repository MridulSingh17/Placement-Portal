import { useState } from 'react';
import axios from 'axios';

const PostJobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/jobs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Job posted successfully!');
    } catch (err) {
      alert('Failed to post job');
    }
  };

  return (
    <form onSubmit={handlePostJob} className="p-4 border rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      {['title', 'company', 'location', 'salary'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={(formData as any)[field]}
          onChange={handleChange}
          className="block w-full mb-3 p-2 border rounded"
        />
      ))}
      <textarea
        name="description"
        placeholder="description"
        value={formData.description}
        onChange={handleChange}
        className="block w-full mb-3 p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Post Job</button>
    </form>
  );
};

export default PostJobForm;
