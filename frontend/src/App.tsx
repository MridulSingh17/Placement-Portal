import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import MyApplications from './pages/MyApplications';
import ApplyJob from './pages/Student/ApplyJob';
import ManageApplications from './pages/Admin/ManageApplications';
import Unauthorized from './pages/Unauthorized';
import useAuthSync from './hooks/useAuthSync';
import useInitializeAuth from './hooks/useInitializeAuth';
import AdminJobApplications from './pages/AdminJobApplications';
import AllStudents from './pages/Admin/AllStudents';
import Profile from './pages/Profile';
import PostJob from './pages/Admin/PostJob';

const App = () => {
  useAuthSync();
  useInitializeAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/manage-applications" element={<ManageApplications />} />
          <Route path="/admin/applications/:jobId" element={<AdminJobApplications />} />
          <Route path="/post-job" element={<PostJob/>} />
          <Route path="/admin/students" element={<AllStudents />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/apply-job" element={<ApplyJob />} />
          <Route path="/my-applications" element={<MyApplications />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
};

export default App;
