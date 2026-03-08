export async function onRequestPost({request, env}) {
  const {email, password} = await request.json();
  const db = env.DB;
  
  const user = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email.toLowerCase()).first();
  if (!user) return Response.json({error: 'Invalid credentials'}, {status: 401});
  
  const encoder = new TextEncoder();
  const data = encoder.encode(password + user.salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const inputHash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  
  if (inputHash !== user.password_hash) return Response.json({error: 'Invalid credentials'}, {status: 401});
  
  const headers = new Headers();
  headers.append('Set-Cookie', `session=${crypto.randomUUID()}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`);
  return new Response(JSON.stringify({success: true}), {status: 200, headers});
}