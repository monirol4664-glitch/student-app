import { useEffect, useState } from "react"
import { api } from "../api"

export default function AdminDashboard() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    api("/students")
      .then(res => res.json())
      .then(data => setStudents(data))
  }, [])

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}