import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6">
        <Link
          to="/manage-applications"
          className="block px-6 py-4 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition"
        >
          Manage Applications
        </Link>

        <Link
          to="/post-job"
          className="block px-6 py-4 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition"
        >
          Post a New Job
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
