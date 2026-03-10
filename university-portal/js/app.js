// SAMPLE DATA

let students = [
{ name:"Rahim", department:"CSE"},
{ name:"Karim", department:"EEE"}
]

let notices = [
{ title:"Admission Open 2026"},
{ title:"Semester Exam Schedule"}
]

// LOAD STUDENTS

const sList = document.getElementById("students")

if(sList){

students.forEach(s => {

const li = document.createElement("li")

li.textContent = s.name + " - " + s.department

sList.appendChild(li)

})

}

// LOAD NOTICES

const nList = document.getElementById("notices")

if(nList){

notices.forEach(n => {

const li = document.createElement("li")

li.textContent = n.title

nList.appendChild(li)

})

}

// REGISTER STUDENT

function registerStudent(){

const name = document.getElementById("name").value

const email = document.getElementById("email").value

const department = document.getElementById("department").value

students.push({name,department})

alert("Student registered (demo)")

}

// ADD NOTICE

function addNotice(){

const title = document.getElementById("title").value

const content = document.getElementById("content").value

notices.push({title})

alert("Notice published (demo)")

}