export default {
  async fetch(request, env) {

    const url = new URL(request.url)

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { headers })
    }

    // SIGNUP
    if (url.pathname === "/signup") {

      const data = await request.json()

      await env.DB.prepare(
        "INSERT INTO users (username,password) VALUES (?,?)"
      ).bind(data.username, data.password).run()

      return new Response(JSON.stringify({ success:true }), { headers })
    }

    // LOGIN
    if (url.pathname === "/login") {

      const data = await request.json()

      const user = await env.DB.prepare(
        "SELECT * FROM users WHERE username=? AND password=?"
      ).bind(data.username, data.password).first()

      if(user){
        return new Response(JSON.stringify({ success:true }), { headers })
      }

      return new Response(JSON.stringify({ success:false }), { headers })
    }

    return new Response(JSON.stringify({ message:"API running" }), { headers })
  }
}