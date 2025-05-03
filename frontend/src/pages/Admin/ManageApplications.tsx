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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosInstance.get('/api/applications');
        setApplications(res.data);
      } catch (err) {
        console.error('Failed to fetch applications', err);
        setError('Failed to load applications.');
      } finally {
        setLoading(false);
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
    } catch (err) {
      console.error('Failed to update status', err);
      alert('Failed to update application status.');
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading applications...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Applications</h1>
      <div className="grid gap-4">
        {applications.length === 0 ? (
          <p className="text-gray-500">No applications found.</p>
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

              <div className="mt-4 flex gap-2 flex-wrap">
                {['shortlisted', 'selected', 'rejected'].map((status) => (
                  <button
                    key={status}
                    className={`px-4 py-2 rounded text-white ${
                      app.status === status
                        ? 'bg-green-600 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={app.status === status}
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
