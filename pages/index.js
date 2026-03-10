import Navbar from "../components/Navbar"
import Link from "next/link"
import { primaryButton } from "../styles/buttons"

export default function Home(){

return(

<div style={{fontFamily:"Arial"}}>

<Navbar/>

<section style={{
padding:"120px",
textAlign:"center"
}}>

<h1>Welcome to Global University</h1>

<p>Empowering the next generation of innovators.</p>

<div style={{marginTop:"20px"}}>

<Link href="/admissions" style={primaryButton}>
Apply Now
</Link>

<Link href="/departments" style={primaryButton}>
View Programs
</Link>

</div>

</section>

</div>

)

}