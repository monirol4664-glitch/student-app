import Link from "next/link"
import { darkButton } from "../styles/buttons"

export default function Admin() {

  return (
    <div style={{fontFamily:"Arial", padding:"40px"}}>

      <h1>Admin Panel</h1>
      <p>Manage student accounts and application status.</p>

      <div style={{marginTop:"30px"}}>

        <button style={darkButton}>
          View Students
        </button>

        <button style={{...darkButton, marginLeft:"10px"}}>
          Approve Applications
        </button>

        <button style={{...darkButton, marginLeft:"10px"}}>
          Update Student Status
        </button>

      </div>

      <div style={{marginTop:"40px"}}>
        <Link href="/" style={{textDecoration:"none"}}>
          ← Back to Home
        </Link>
      </div>

    </div>
  )
}