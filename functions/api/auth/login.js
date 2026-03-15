export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email, password } = body

  if (!email || !password) {
    return Response.json({ error: 'Email and password required' }, { status: 400 })
  }

  try {
    const user = await env.DB.prepare(`
      SELECT student_id, password_hash
      FROM students
      WHERE email = ?
    `).bind(email.toLowerCase()).first()

    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // WARNING: plain password comparison – MUST replace with secure hash verification
    if (password !== user.password_hash) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = crypto.randomUUID()
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    await env.DB.prepare(`
      INSERT INTO sessions (student_id, token, expires_at)
      VALUES (?, ?, ?)
    `).bind(user.student_id, token, expires).run()

    return new Response(
      JSON.stringify({ message: 'Logged in' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
        }
      }
    )
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}