import Link from "next/link"

export default function Home() {
  return (
    <div style={{fontFamily:"Arial"}}>

      <nav style={{background:"#002147",color:"white",padding:"15px"}}>
        <h2>Global University</h2>
        <Link href="/" style={{marginRight:10,color:"white"}}>Home</Link>
        <Link href="/about" style={{marginRight:10,color:"white"}}>About</Link>
        <Link href="/admissions" style={{marginRight:10,color:"white"}}>Admissions</Link>
        <Link href="/departments" style={{marginRight:10,color:"white"}}>Departments</Link>
        <Link href="/contact" style={{color:"white"}}>Contact</Link>
      </nav>

      <section style={{padding:"60px",background:"#f5f5f5",textAlign:"center"}}>
        <h1>Welcome to Global University</h1>
        <p>Empowering students with knowledge and innovation.</p>
      </section>

      <section style={{padding:"40px"}}>
        <h2>Our Programs</h2>

        <div style={{display:"flex",gap:"20px"}}>
          <div style={{border:"1px solid #ddd",padding:"20px"}}>
            <h3>Computer Science</h3>
            <p>Learn modern software development.</p>
          </div>

          <div style={{border:"1px solid #ddd",padding:"20px"}}>
            <h3>Business Administration</h3>
            <p>Build leadership and business skills.</p>
          </div>

          <div style={{border:"1px solid #ddd",padding:"20px"}}>
            <h3>Engineering</h3>
            <p>Innovate with cutting-edge technology.</p>
          </div>
        </div>
      </section>

      <footer style={{background:"#002147",color:"white",padding:"20px",textAlign:"center"}}>
        © 2026 Global University
      </footer>

    </div>
  )
}