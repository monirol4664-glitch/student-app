import Navbar from "../components/Navbar"

export default function Admin(){
  return (
    <div>
      <Navbar/>

      <div style={{padding:"40px"}}>
        <h1>Admin Dashboard</h1>

        <p>Manage student applications.</p>

        <ul>
          <li>Approve Students</li>
          <li>Reject Students</li>
          <li>View Applications</li>
        </ul>
      </div>
    </div>
  )
}