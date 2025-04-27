import { useState, useEffect } from 'react';
import axios from 'axios';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

const ApplyJob = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobsAndApplications = async () => {
      try {
        const jobsRes = await axios.get('/api/jobs');
        setJobs(jobsRes.data);

        const appsRes = await axios.get('/api/applications/mine');
        const appliedIds = appsRes.data.map((app: any) => app.jobId._id);
        setAppliedJobIds(appliedIds);
      } catch (error) {
        console.error('Failed to fetch jobs or applications');
      }
    };

    fetchJobsAndApplications();
  }, []);

  const applyToJob = async (jobId: string) => {
    try {
      await axios.post('/api/applications', { jobId });
      setAppliedJobIds((prev) => [...prev, jobId]);
    } catch (error) {
      console.error('Failed to apply to job');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Apply for Jobs</h1>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <p className="mt-2">{job.description}</p>

            {appliedJobIds.includes(job._id) ? (
              <button
                className="mt-4 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                disabled
              >
                Already Applied
              </button>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => applyToJob(job._id)}
              >
                Apply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplyJob;
