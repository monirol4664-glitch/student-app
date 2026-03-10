import Link from "next/link"
import { darkButton } from "../styles/buttons"

export default function Login() {

  return (
    <div style={{fontFamily:"Arial",padding:"40px"}}>

      <h1>Student Login</h1>

      <input placeholder="Email" style={{display:"block",padding:"10px",marginBottom:"10px"}}/>
      <input placeholder="Password" type="password" style={{display:"block",padding:"10px",marginBottom:"20px"}}/>

      <button style={darkButton}>Login</button>

      <div style={{marginTop:"20px"}}>
        <Link href="/">Back Home</Link>
      </div>

    </div>
  )
}