export default {

async fetch(request, env){

const url = new URL(request.url)

if(url.pathname==="/register"){

const data = await request.json()

await env.DB.prepare(
"INSERT INTO students (name,email,password) VALUES (?,?,?)"
)
.bind(data.name,data.email,data.password)
.run()

return new Response("registered")

}

if(url.pathname==="/login"){

const data = await request.json()

const user = await env.DB.prepare(
"SELECT * FROM students WHERE email=? AND password=?"
)
.bind(data.email,data.password)
.first()

if(!user){
return new Response("invalid",{status:401})
}

return Response.json(user)

}

return new Response("API running")

}

}