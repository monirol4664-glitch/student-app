import {useState} from "react"
import {login} from "../api"

export default function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

async function submit(){

const res = await login({email,password})
const data = await res.json()

localStorage.setItem("user",JSON.stringify(data))

window.location="/dashboard"

}

return(

<div>

<h2>Login</h2>

<input
placeholder="email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={submit}>Login</button>

</div>

)

}