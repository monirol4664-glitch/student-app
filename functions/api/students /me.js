{
  const { request, env } = context;

  // Get session cookie
  const cookie = request.headers.get("Cookie") || "";
  const sessionToken = cookie.match(/session=([^;]+)/)?.[1];

  if (!sessionToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const session = await env.DB.prepare(
      "SELECT student_id FROM sessions WHERE token = ? AND expires_at > ?"
    ).bind(sessionToken, new Date().toISOString()).first();

    if (!session) {
      return new Response("Session expired or invalid", { status: 401 });
    }

    const profile = await env.DB.prepare(
      "SELECT student_id, full_name, email, department, batch, created_at FROM students WHERE student_id = ?"
    ).bind(session.student_id).first();

    if (!profile) {
      return new Response("Profile not found", { status: 404 });
    }

    return Response.json(profile);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}