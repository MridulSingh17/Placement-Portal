import { useEffect, useState } from 'react';
import PostJobForm from '../components/PostJobForm';
import axiosInstance from '../api/axiosInstance';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  lastDate?: string;
  openings?: number;
}

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [role, setRole] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobRes = await axiosInstance.get('/api/jobs');
        setJobs(jobRes.data);

        const userRes = await axiosInstance.get('/api/auth/profile');
        setRole(userRes.data.user?.role || '');

        if (userRes.data.user?.role === 'student') {
          const apps = await axiosInstance.get('/api/applications/my');
          const jobIds = apps.data.map((a: any) => a.jobId._id);
          setAppliedJobs(jobIds);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApply = async (jobId: string) => {
    try {
      await axiosInstance.post('/api/applications/apply', { jobId });
      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (err) {
      console.error('Failed to apply:', err);
    }
  };

  return (
    <div className="p-6">
      {role === 'admin' && <PostJobForm />}

      {loading ? (
        <div className="text-center text-gray-500 text-xl my-8">Loading...</div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
          <div className="grid gap-4">
            {Array.isArray(jobs) && jobs.map((job) => (
              <div key={job._id} className="p-4 border rounded shadow">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company} — {job.location}</p>
                <p className="mt-2">{job.description}</p>
                {job.salary && (
                  <p className="text-sm text-gray-500 mt-1">Salary: {job.salary}</p>
                )}
                {job.lastDate && (
                  <p className="text-sm text-gray-500">Last Date: {job.lastDate}</p>
                )}
                {job.openings !== undefined && (
                  <p className="text-sm text-gray-500">Openings: {job.openings}</p>
                )}

                {role === 'student' && (
                  <button
                    className={`mt-4 px-4 py-2 text-white rounded ${
                      appliedJobs.includes(job._id)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={appliedJobs.includes(job._id)}
                    onClick={() => handleApply(job._id)}
                  >
                    {appliedJobs.includes(job._id) ? 'Applied' : 'Apply'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
