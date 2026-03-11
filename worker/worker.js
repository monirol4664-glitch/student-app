export default {

async fetch(request, env) {

const url = new URL(request.url)

const headers = {
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "GET,POST,OPTIONS",
"Access-Control-Allow-Headers": "Content-Type",
"Content-Type": "application/json"
}

if(request.method==="OPTIONS"){
return new Response(null,{headers})
}



/* REGISTER */

if(url.pathname==="/register" && request.method==="POST"){

const data = await request.json()

const {username,email,password} = data

if(!username || !email || !password){

return new Response(JSON.stringify({error:"Missing fields"}),{headers})

}

await env.DB.prepare(

`INSERT INTO users (username,email,password,role,status)
VALUES (?,?,?,?,?)`

)

.bind(username,email,password,"student","pending")

.run()

return new Response(JSON.stringify({

message:"Registration submitted. Waiting for admin approval."

}),{headers})

}



/* LOGIN */

if(url.pathname==="/login" && request.method==="POST"){

const data = await request.json()

const {email,password} = data

const user = await env.DB.prepare(

`SELECT * FROM users WHERE email=? AND password=?`

)

.bind(email,password)

.first()

if(!user){

return new Response(JSON.stringify({

error:"Invalid login"

}),{headers})

}

return new Response(JSON.stringify({

role:user.role,
status:user.status,
username:user.username,
id:user.id

}),{headers})

}



/* GET STUDENTS */

if(url.pathname==="/students"){

const students = await env.DB.prepare(

`SELECT id,username,email,status FROM users WHERE role='student'`

)

.all()

return new Response(JSON.stringify(students.results),{headers})

}



/* APPROVE STUDENT */

if(url.pathname==="/approve" && request.method==="POST"){

const data = await request.json()

await env.DB.prepare(

`UPDATE users SET status='active' WHERE id=?`

)

.bind(data.id)

.run()

return new Response(JSON.stringify({

message:"Student approved"

}),{headers})

}



/* DISAPPROVE STUDENT */

if(url.pathname==="/disapprove" && request.method==="POST"){

const data = await request.json()

await env.DB.prepare(

`UPDATE users SET status='disapproved' WHERE id=?`

)

.bind(data.id)

.run()

return new Response(JSON.stringify({

message:"Student disapproved"

}),{headers})

}



/* SAVE STUDENT PROFILE */

if(url.pathname==="/profile" && request.method==="POST"){

const data = await request.json()

await env.DB.prepare(

`INSERT INTO student_profiles
(user_id,full_name,session,course,department,phone,address,profile_completed)

VALUES (?,?,?,?,?,?,?,1)`

)

.bind(

data.user_id,
data.full_name,
data.session,
data.course,
data.department,
data.phone,
data.address

)

.run()

return new Response(JSON.stringify({

message:"Profile saved"

}),{headers})

}



/* SUBMIT RESULT */

if(url.pathname==="/submit-result" && request.method==="POST"){

const data = await request.json()

await env.DB.prepare(

`INSERT INTO results (student_id,course_id,marks,grade)
VALUES (?,?,?,?)`

)

.bind(

data.student_id,
data.course_id,
data.marks,
data.grade

)

.run()

return new Response(JSON.stringify({

message:"Result submitted"

}),{headers})

}



/* VIEW RESULTS */

if(url.pathname==="/results"){

const studentId = url.searchParams.get("student")

const results = await env.DB.prepare(

`SELECT * FROM results WHERE student_id=?`

)

.bind(studentId)

.all()

return new Response(JSON.stringify(results.results),{headers})

}



return new Response("University API Running")

}

}