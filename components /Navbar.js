import Link from "next/link"
import { primaryButton, adminButton } from "../styles/buttons"

export default function Navbar(){
  return (
    <nav style={{
      background:"#002147",
      color:"white",
      padding:"15px",
      display:"flex",
      justifyContent:"space-between"
    }}>
      <h2>Global University</h2>

      <div>
        <Link href="/" style={{marginRight:15,color:"white"}}>Home</Link>
        <Link href="/about" style={{marginRight:15,color:"white"}}>About</Link>
        <Link href="/admissions" style={{marginRight:15,color:"white"}}>Admissions</Link>
        <Link href="/departments" style={{marginRight:15,color:"white"}}>Departments</Link>
        <Link href="/contact" style={{marginRight:15,color:"white"}}>Contact</Link>

        <Link href="/login" style={primaryButton}>Login</Link>
        <Link href="/signup" style={primaryButton}>Signup</Link>
        <Link href="/admin" style={adminButton}>Admin</Link>
      </div>
    </nav>
  )
}