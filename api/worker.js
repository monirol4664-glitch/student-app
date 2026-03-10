export default {
  async fetch(request, env) {

    const url = new URL(request.url)

    // GET STUDENTS
    if (url.pathname === "/api/students" && request.method === "GET") {

      const { results } = await env.DB.prepare(
        "SELECT * FROM students"
      ).all()

      return Response.json(results)
    }

    // ADD STUDENT
    if (url.pathname === "/api/students" && request.method === "POST") {

      const data = await request.json()

      await env.DB.prepare(
        "INSERT INTO students (name,email,department) VALUES (?,?,?)"
      )
      .bind(data.name, data.email, data.department)
      .run()

      return Response.json({ success: true })
    }

    // GET COURSES
    if (url.pathname === "/api/courses" && request.method === "GET") {

      const { results } = await env.DB.prepare(
        "SELECT * FROM courses"
      ).all()

      return Response.json(results)
    }

    return new Response("API running")
  }
}