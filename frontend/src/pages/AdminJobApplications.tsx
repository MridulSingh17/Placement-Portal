import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

interface Application {
  _id: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
  };
  status: 'applied' | 'shortlisted' | 'selected' | 'rejected';
}

const AdminJobApplications = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosInstance.get(`/api/applications/job/${jobId}`);
        setApplications(res.data);
      } catch (err) {
        console.error('Failed to fetch applications', err);
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      await axiosInstance.put(`/api/applications/${applicationId}/status`, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus as any } : app
        )
      );
    } catch (err) {
      console.error('Failed to update application status', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Applications for Job ID: {jobId}</h1>
      {applications.length === 0 ? (
        <p className="text-gray-500">No applications found for this job.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div key={app._id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{app.studentId.name}</h2>
              <p>{app.studentId.email}</p>
              <p className="mt-2">Status: <strong>{app.status}</strong></p>

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
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminJobApplications;
