import { darkButton } from "../styles/buttons"
export default function Admin()
{
  return (
    <div style={{padding:"50px", fontFamily:"Arial"}}>
      <h1>Admin Panel</h1>
      <p>This is where administrators will manage student accounts.</p>

      <button style={darkButton}>
        Manage Student Status
      </button>
    </div>
  )
}