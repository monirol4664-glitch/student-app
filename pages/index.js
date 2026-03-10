export default function Home() {
  return (
    <div style={{
      display:"flex",
      height:"100vh",
      justifyContent:"center",
      alignItems:"center",
      background:"#0f172a",
      color:"white",
      flexDirection:"column",
      fontFamily:"Arial"
    }}>
      <h1 style={{fontSize:"40px"}}>My Cloudflare Next.js App 🚀</h1>
      <p style={{fontSize:"18px"}}>Deployment successful!</p>
      <button style={{
        padding:"10px 20px",
        background:"#22c55e",
        border:"none",
        borderRadius:"6px",
        color:"white",
        marginTop:"20px",
        cursor:"pointer"
      }}>
        Click Me
      </button>
    </div>
  )
}