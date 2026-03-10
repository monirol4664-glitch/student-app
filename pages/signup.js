import Link from "next/link"
import { darkButton } from "../styles/buttons"

export default function Signup() {

  return (
    <div style={{fontFamily:"Arial",padding:"40px"}}>

      <h1>Student Signup</h1>

      <input placeholder="Full Name" style={{display:"block",marginBottom:"10px",padding:"10px"}}/>
      <input placeholder="Email" style={{display:"block",marginBottom:"10px",padding:"10px"}}/>
      <input placeholder="Password" type="password" style={{display:"block",marginBottom:"20px",padding:"10px"}}/>

      <button style={darkButton}>Create Account</button>

      <div style={{marginTop:"20px"}}>
        <Link href="/">Back Home</Link>
      </div>

    </div>
  )
}