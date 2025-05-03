import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

interface Student {
  _id: string;
  name: string;
  email: string;
}

const AllStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosInstance.get('/api/users/students');
        setStudents(res.data);
      } catch (err) {
        console.error('Failed to fetch students', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Registered Students</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-500">No students found.</p>
      ) : (
        <div className="grid gap-4">
          {students.map((student) => (
            <div key={student._id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{student.name}</h2>
              <p>{student.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStudents;
