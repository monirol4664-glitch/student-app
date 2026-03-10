import Navbar from "../components/Navbar"

export default function Login(){
  return (
    <div>
      <Navbar/>

      <div style={{padding:"40px"}}>
        <h1>Student Login</h1>

        <input placeholder="Email" style={{display:"block",marginBottom:10}} />
        <input placeholder="Password" type="password" style={{display:"block",marginBottom:10}} />

        <button>Login</button>
      </div>
    </div>
  )
}