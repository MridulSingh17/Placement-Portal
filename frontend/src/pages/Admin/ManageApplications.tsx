import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';


interface Application {
  _id: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
  };
  jobId: {
    _id: string;
    title: string;
    company: string;
  };
  status: 'applied' | 'shortlisted' | 'selected' | 'rejected';
}

const ManageApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosInstance.get('/api/applications');
        setApplications(res.data);
      } catch (error) {
        console.error('Failed to fetch applications', error);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
        await axiosInstance.put(`/api/applications/${applicationId}/status`, { status: newStatus });
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus as any } : app
        )
      );
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Applications</h1>
      <div className="grid gap-4">
        {applications.length === 0 ? (
          <p className="text-gray-500">No applications found yet.</p>
        ) : (
          applications.map((app) => (
            <div key={app._id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{app.studentId.name}</h2>
              <p className="text-gray-600">{app.studentId.email}</p>
              <p className="mt-2 font-semibold">
                Job: {app.jobId.title} at {app.jobId.company}
              </p>
              <p className="mt-2">
                Status: <strong>{app.status}</strong>
              </p>

              <div className="mt-4 flex gap-2">
                {['shortlisted', 'selected', 'rejected'].map((status) => (
                  <button
                    key={status}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => handleStatusChange(app._id, status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
