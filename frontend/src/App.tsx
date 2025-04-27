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


const App = () => {
  useAuthSync()
  useInitializeAuth
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


        <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
          <Route path="/" element={<Dashboard />} />
        </Route>      
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/manage-applications" element={<ManageApplications/>} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/apply-job" element={<ApplyJob />} />
          <Route path="/my-applications" element={<MyApplications />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized/>} />
      </Routes>
    </>
  );
};

export default App;
