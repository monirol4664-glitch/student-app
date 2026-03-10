export default function Signup() {
  return (
    <div style={{padding:"50px",maxWidth:"400px",margin:"auto"}}>

      <h1>Student Sign Up</h1>

      <input
        type="text"
        placeholder="Full Name"
        style={{width:"100%",padding:"10px",marginBottom:"10px"}}
      />

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
        background:"#ffcc00",
        border:"none",
        borderRadius:"6px",
        fontWeight:"bold"
      }}>
        Create Account
      </button>

    </div>
  )
}