export default {
  async fetch(request, env) {

    const url = new URL(request.url)

    if (url.pathname === "/api/register") {

      const data = await request.json()

      const stmt = env.DB.prepare(
        "INSERT INTO students (name,email,password,department) VALUES (?,?,?,?)"
      )

      await stmt.bind(
        data.name,
        data.email,
        data.password,
        data.department
      ).run()

      return Response.json({status:"registered"})
    }

    if (url.pathname === "/api/login") {

      const data = await request.json()

      const stmt = env.DB.prepare(
        "SELECT * FROM students WHERE email=? AND password=?"
      )

      const result = await stmt.bind(
        data.email,
        data.password
      ).first()

      if(!result){
        return Response.json({status:"invalid"})
      }

      return Response.json({status:"success", user:result})
    }

    if (url.pathname === "/api/students") {

      const stmt = env.DB.prepare(
        "SELECT * FROM students"
      )

      const result = await stmt.all()

      return Response.json(result)
    }

    return new Response("University API Running")
  }
}