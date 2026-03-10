export default {
  async fetch(request, env) {

    const url = new URL(request.url)
    const path = url.pathname.replace(/\/$/, "")

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { headers })
    }

    if (path === "/api/students") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM students"
      ).all()

      return new Response(JSON.stringify(results), { headers })
    }

    if (path === "/api/courses") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM courses"
      ).all()

      return new Response(JSON.stringify(results), { headers })
    }

    return new Response("API running", { headers })
  }
}