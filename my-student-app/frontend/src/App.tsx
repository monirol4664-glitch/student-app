import { useEffect, useState } from 'react';

interface Student {
  id: number;
  name: string;
  email: string;
  enrollment_date: string;
}

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const API_URL = 'https://your-worker.your-subdomain.workers.dev'; // Replace with deployed URL

  useEffect(() => {
    fetch(`${API_URL}/api/students`)
      .then(res => res.json())
      .then(setStudents);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Student Management</h1>
      <div className="grid gap-4">
        {students.map(student => (
          <div key={student.id} className="p-4 border rounded shadow">
            <h2 className="font-semibold">{student.name}</h2>
            <p>{student.email}</p>
            <p>Enrolled: {student.enrollment_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
