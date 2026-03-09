const API = "student-api.monirol4664.workers.dev"

export async function register(data){
 return fetch(API+"/register",{
  method:"POST",
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(data)
 })
}

export async function login(data){
 return fetch(API+"/login",{
  method:"POST",
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(data)
 })
}

export async function getStudents(){
 return fetch(API+"/students")
}