import Link from "next/link"
import { primaryButton, adminButton } from "../styles/buttons"

export default function Home() {

  return (
    <div style={{fontFamily:"Arial"}}>

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

          <Link href="/signup" style={primaryButton}>Sign Up</Link>
          <Link href="/login" style={primaryButton}>Login</Link>
          <Link href="/admin" style={adminButton}>Admin</Link>
        </div>
      </nav>

      <section style={{padding:"120px",textAlign:"center"}}>
        <h1>Welcome to Global University</h1>
        <p>Empowering the next generation of innovators.</p>

        <div style={{marginTop:"20px"}}>
          <Link href="/admissions" style={primaryButton}>Apply Now</Link>
          <Link href="/departments" style={primaryButton}>Programs</Link>
        </div>
      </section>

    </div>
  )
}