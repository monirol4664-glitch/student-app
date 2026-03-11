const API = "https://api.monirol4664.workers.dev/worker"


/* REGISTER */

const registerForm = document.getElementById("registerForm")

if(registerForm){

registerForm.addEventListener("submit", async (e)=>{

e.preventDefault()

const inputs = registerForm.querySelectorAll("input")

const username = inputs[0].value
const email = inputs[1].value
const password = inputs[2].value


const res = await fetch(API + "/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username,
email,
password
})

})

const data = await res.json()

alert(data.message || data.error)

})

}



/* LOGIN */

const loginForm = document.getElementById("loginForm")

if(loginForm){

loginForm.addEventListener("submit", async (e)=>{

e.preventDefault()

const inputs = loginForm.querySelectorAll("input")

const email = inputs[0].value
const password = inputs[1].value


const res = await fetch(API + "/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

})

const data = await res.json()

if(data.error){

alert(data.error)
return

}


if(data.role === "admin"){

window.location = "admin-dashboard.html"

return

}


if(data.status === "pending"){

window.location = "student-dashboard.html"

return

}


if(data.status === "active"){

window.location = "student-dashboard.html"

}

})

}