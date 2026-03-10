import Link from "next/link"
import { darkButton } from "../styles/buttons"

export default function Admin() {

  return (
    <div style={{fontFamily:"Arial",padding:"40px"}}>

      <h1>Admin Panel</h1>
      <p>Manage student status here.</p>

      <div style={{marginTop:"20px"}}>
        <button style={darkButton}>View Students</button>
        <button style={darkButton}>Approve Students</button>
        <button style={darkButton}>Update Status</button>
      </div>

      <div style={{marginTop:"30px"}}>
        <Link href="/">Back Home</Link>
      </div>

    </div>
  )
}