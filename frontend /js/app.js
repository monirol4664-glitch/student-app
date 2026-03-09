const API = "https://your-worker-url.workers.dev"

document.getElementById("registerForm")
.addEventListener("submit", async (e)=>{

e.preventDefault()

const data = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
password: document.getElementById("password").value,
department: document.getElementById("department").value
}

await fetch(API+"/api/register",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(data)
})

alert("Student Registered")

})