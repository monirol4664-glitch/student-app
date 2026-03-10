export default {
  async fetch(request, env) {

    const url = new URL(request.url)
    const path = url.pathname.replace(/\/$/, "")

    if (path === "/api/students") {

      const { results } = await env.DB.prepare(
        "SELECT * FROM students"
      ).all()

      return Response.json(results)
    }

    if (path === "/api/courses") {

      const { results } = await env.DB.prepare(
        "SELECT * FROM courses"
      ).all()

      return Response.json(results)
    }

    return new Response("API running")
  }
}