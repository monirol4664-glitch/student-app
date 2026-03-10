import Link from "next/link"

export default function Home() {
  const buttonStyle = {
  background:"#ffcc00",
  padding:"10px 18px",
  borderRadius:"6px",
  textDecoration:"none",
  color:"#002147",
  fontWeight:"bold",
  marginRight:"10px"
}
  return (
    <div style={{fontFamily:"Arial"}}>

      {/* Navbar */}
      <nav style={{
        background:"#002147",
        color:"white",
        padding:"15px",
        display:"flex",
        justifyContent:"space-between"
      }}>
        <h2>Global University</h2>

        <div>
          <Link href="/" style={{marginRight:15,color:"white"},style={buttonStyle}}>Home</Link>
          <Link href="/about" style={{marginRight:15,color:"white"},style={buttonStyle}}>About</Link>
          <Link href="/admissions" style={{marginRight:15,color:"white"},style={buttonStyle}}>Admissions</Link>
          <Link href="/departments" style={{marginRight:15,color:"white"},style={buttonStyle}}>Departments</Link>
          <Link href="/contact" style={{color:"white"},style={buttonStyle}}>Contact</Link>
          <Link href="/signup" style={buttonStyle}>Sign Up</Link>
<Link href="/login" style={buttonStyle}>Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background:"linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(https://images.unsplash.com/photo-1523240795612-9a054b0db644)",
        backgroundSize:"cover",
        color:"white",
        padding:"120px",
        textAlign:"center"
      }}>
        <h1>Welcome to Global University</h1>
        <p>Empowering the next generation of innovators.</p>
      </section>

      {/* Programs */}
      <section style={{padding:"50px"}}>
        <h2 style={{textAlign:"center"}}>Our Programs</h2>

        <div style={{
          display:"flex",
          justifyContent:"center",
          gap:"20px",
          marginTop:"30px",
          flexWrap:"wrap"
        }}>

          <div style={{border:"1px solid #ddd",padding:"20px",width:"250px"}}>
            <h3>Computer Science</h3>
            <p>Learn programming, AI, and modern software development.</p>
          </div>

          <div style={{border:"1px solid #ddd",padding:"20px",width:"250px"}}>
            <h3>Business Administration</h3>
            <p>Develop leadership and management skills.</p>
          </div>

          <div style={{border:"1px solid #ddd",padding:"20px",width:"250px"}}>
            <h3>Engineering</h3>
            <p>Build innovative solutions for the future.</p>
          </div>

        </div>
      </section>

      {/* News Section */}
      <section style={{background:"#f5f5f5",padding:"50px"}}>
        <h2 style={{textAlign:"center"}}>Latest News</h2>

        <div style={{
          display:"flex",
          justifyContent:"center",
          gap:"20px",
          marginTop:"30px",
          flexWrap:"wrap"
        }}>

          <div style={{background:"white",padding:"20px",width:"250px"}}>
            <h4>New AI Research Lab</h4>
            <p>Our university opened a new AI research center.</p>
          </div>

          <div style={{background:"white",padding:"20px",width:"250px"}}>
            <h4>Scholarship Program</h4>
            <p>100 new scholarships available for international students.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background:"#002147",
        color:"white",
        padding:"20px",
        textAlign:"center"
      }}>
        <p>© 2026 Global University</p>
      </footer>

    </div>
  )
}
