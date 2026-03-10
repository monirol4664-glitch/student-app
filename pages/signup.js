import Link from "next/link"
import { darkButton } from "../styles/buttons.js"

export default function Signup() {

  return (
    <div style={{fontFamily:"Arial",padding:"40px"}}>

      <h1>Create Student Account</h1>

      <input placeholder="Full Name" style={{display:"block",padding:"10px",marginBottom:"10px"}}/>
      <input placeholder="Email" style={{display:"block",padding:"10px",marginBottom:"10px"}}/>
      <input placeholder="Password" type="password" style={{display:"block",padding:"10px",marginBottom:"20px"}}/>

      <button style={darkButton}>Create Account</button>

      <div style={{marginTop:"20px"}}>
        <Link href="/">Back Home</Link>
      </div>

    </div>
  )
}