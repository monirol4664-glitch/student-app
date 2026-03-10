import Navbar from "../components/Navbar"
import { darkButton } from "../styles/buttons.js"

export default function Admin(){

return(

<div style={{fontFamily:"Arial"}}>

<Navbar/>

<div style={{padding:"40px"}}>

<h1>Admin Dashboard</h1>

<div style={{
display:"flex",
gap:"20px",
marginTop:"20px",
flexWrap:"wrap"
}}>

<div style={{
border:"1px solid #ddd",
padding:"20px",
width:"200px"
}}>
<h3>Total Students</h3>
<p>120</p>
</div>

<div style={{
border:"1px solid #ddd",
padding:"20px",
width:"200px"
}}>
<h3>Pending Applications</h3>
<p>14</p>
</div>

</div>

<h2 style={{marginTop:"40px"}}>Student Management</h2>

<button style={darkButton}>View Students</button>
<button style={darkButton}>Approve Students</button>
<button style={darkButton}>Update Status</button>

</div>

</div>

)

}