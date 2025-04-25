// src/pages/MyApplications.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Application {
  _id: string;
  status: string;
  jobId: {
    _id: string;
    title: string;
    company: string;
    location: string;
  };
}

const MyApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/applications/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(res.data);
      } catch (err) {
        console.error('Failed to fetch applications', err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      <div className="grid gap-4">
        {applications.length === 0 ? (
          <p className="text-gray-600">You haven’t applied to any jobs yet.</p>
        ) : (
          applications.map((app) => (
            <div key={app._id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{app.jobId.title}</h2>
              <p className="text-gray-600">{app.jobId.company} — {app.jobId.location}</p>
              <p className="mt-2 text-sm text-blue-700 font-medium">Status: {app.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyApplications;
