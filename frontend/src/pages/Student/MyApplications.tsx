import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';


interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    company: string;
    location: string;
  };
  status: 'applied' | 'shortlisted' | 'selected' | 'rejected';
  appliedOn: string;
}

const MyApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token'); // ✅ get token
        if (!token) {
          alert('You are not authorized');
          return;
        }

        const res = await axiosInstance.get('/api/applications/mine', {
          headers: { Authorization: `Bearer ${token}` }, // ✅ pass token
        });

        setApplications(res.data);
      } catch (error) {
        console.error('Failed to fetch your applications', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      <div className="grid gap-4">
        {applications.map((app) => (
          <div key={app._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{app.jobId.title}</h2>
            <p className="text-gray-600">{app.jobId.company} - {app.jobId.location}</p>
            <p className="mt-2">Status: <strong>{app.status}</strong></p>
            <p className="mt-2 text-sm text-gray-500">Applied on: {new Date(app.appliedOn).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
