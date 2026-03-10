import Navbar from "../components/Navbar"

export default function Home(){
  return (
    <div>
      <Navbar/>

      <div style={{padding:"40px"}}>
        <h1>Welcome to Global University</h1>
        <p>Providing world class education for future leaders.</p>
      </div>
    </div>
  )
}