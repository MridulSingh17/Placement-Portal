import { useEffect, useState } from 'react';
import axios from 'axios';
import PostJobForm from '../components/PostJobForm';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
}

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [role, setRole] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const jobRes = await axios.get('/api/jobs');
        setJobs(jobRes.data);

        if (token) {
          const userRes = await axios.get('/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setRole(userRes.data.role);

          if (userRes.data.role === 'student') {
            const apps = await axios.get('/api/applications/my', {
              headers: { Authorization: `Bearer ${token}` },
            });
            const jobIds = apps.data.map((a: any) => a.jobId);
            setAppliedJobs(jobIds);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleApply = async (jobId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/applications',
        { jobId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (err) {
      console.error('Failed to apply:', err);
    }
  };

  return (
    <div className="p-6">
      {role === 'admin' && <PostJobForm />}

      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <p className="mt-2">{job.description}</p>
            {job.salary && <p className="text-sm text-gray-500 mt-1">Salary: {job.salary}</p>}

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
    </div>
  );
};

export default Dashboard;
