const API="https://YOUR_WORKER_URL"

async function signup(){

const username=document.getElementById("username").value
const password=document.getElementById("password").value

await fetch(API+"/signup",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password})
})

alert("Signup successful")
location.href="login.html"

}

async function login(){

const username=document.getElementById("username").value
const password=document.getElementById("password").value

const res=await fetch(API+"/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password})
})

const data=await res.json()

if(data.success){

localStorage.setItem("token","logged")
location.href="dashboard.html"

}else{

alert("Invalid login")

}

}