const API = "https://api.monirol4664.workers.dev/api"



const form = document.getElementById("studentForm")

if(form){

form.addEventListener("submit", async (e)=>{

e.preventDefault()

const data = {

name: document.getElementById("name").value,
email: document.getElementById("email").value,
department: document.getElementById("department").value

}

await fetch(API + "/students",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

})

alert("Student Registered")

})

}



async function loadStudents(){

const res = await fetch(API + "/students")

const students = await res.json()

const list = document.getElementById("students")

if(!list) return

students.forEach(s=>{

const li = document.createElement("li")

li.innerText = s.name + " - " + s.department

list.appendChild(li)

})

}



async function loadCourses(){

const res = await fetch(API + "/courses")

const courses = await res.json()

const list = document.getElementById("courses")

if(!list) return

courses.forEach(c=>{

const li = document.createElement("li")

li.innerText = c.title + " (" + c.credits + " credits)"

list.appendChild(li)

})

}



loadStudents()
loadCourses()