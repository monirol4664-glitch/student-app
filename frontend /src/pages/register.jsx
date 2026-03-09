import {useState} from "react"
import {register} from "../api"

export default function Register(){

const [form,setForm] = useState({
 name:"",
 email:"",
 password:""
})

async function submit(){

 const res = await register(form)
 alert(await res.text())

}

return(

<div>

<h2>Student Register</h2>

<input
placeholder="name"
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

<input
placeholder="email"
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<input
type="password"
placeholder="password"
onChange={(e)=>setForm({...form,password:e.target.value})}
/>

<button onClick={submit}>Register</button>

</div>

)

}