export default function Login() {
  return (
    <div style={{padding:"50px",maxWidth:"400px",margin:"auto"}}>

      <h1>Student Login</h1>

      <input
        type="email"
        placeholder="Email"
        style={{width:"100%",padding:"10px",marginBottom:"10px"}}
      />

      <input
        type="password"
        placeholder="Password"
        style={{width:"100%",padding:"10px",marginBottom:"10px"}}
      />

      <button style={{
        width:"100%",
        padding:"10px",
        background:"#002147",
        color:"white",
        border:"none",
        borderRadius:"6px"
      }}>
        Login
      </button>

    </div>
  )
}