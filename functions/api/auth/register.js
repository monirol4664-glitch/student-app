export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const {
    student_id,
    full_name,
    email,
    department = null,
    batch,
    password
  } = body

  if (!student_id || !full_name || !email || !batch || !password) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (password.length < 8) {
    return Response.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  try {
    const exists = await env.DB.prepare(
      'SELECT 1 FROM students WHERE student_id = ? OR email = ?'
    ).bind(student_id, email.toLowerCase()).first()

    if (exists) {
      return Response.json({ error: 'Student ID or email already registered' }, { status: 409 })
    }

    // WARNING: plain password – replace with hashing in production!
    await env.DB.prepare(`
      INSERT INTO students (student_id, full_name, email, department, batch, password_hash, created_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(student_id, full_name, email.toLowerCase(), department, batch, password).run()

    return Response.json({ message: 'Registered successfully' }, { status: 201 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Database error' }, { status: 500 })
  }
}