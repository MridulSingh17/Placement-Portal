// src/pages/AdminDashboard.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Application {
  _id: string;
  status: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
  };
  jobId: {
    _id: string;
    title: string;
  };
}

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/applications/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications', err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/applications/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchApplications(); // refresh after update
    } catch (err) {
      console.error('Error updating status', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin - Job Applications</h1>
      {applications.length === 0 ? (
        <p className="text-gray-600">No applications yet.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div key={app._id} className="p-4 border rounded shadow">
              <h2 className="font-semibold text-lg">{app.jobId.title}</h2>
              <p>
                <strong>Student:</strong> {app.studentId.name} ({app.studentId.email})
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {app.status}
              </p>
              <div className="flex gap-2">
                {['shortlisted', 'selected', 'rejected'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(app._id, s)}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
                  >
                    Mark {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
