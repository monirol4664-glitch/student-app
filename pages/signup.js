import Navbar from "../components/Navbar"

export default function Signup(){
  return (
    <div>
      <Navbar/>

      <div style={{padding:"40px"}}>
        <h1>Student Signup</h1>

        <input placeholder="Name" style={{display:"block",marginBottom:10}} />
        <input placeholder="Email" style={{display:"block",marginBottom:10}} />
        <input placeholder="Password" type="password" style={{display:"block",marginBottom:10}} />

        <button>Register</button>
      </div>
    </div>
  )
}