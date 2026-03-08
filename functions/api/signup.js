export async function onRequestPost({request, env}) {
  try {
    const {email, password} = await request.json();
    const db = env.DB;
    
    const salt = crypto.randomUUID();
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const passwordHash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    await db.prepare('INSERT INTO users (email, password_hash, salt) VALUES (?, ?, ?)')
      .bind(email.toLowerCase(), passwordHash, salt).run();
      
    return Response.json({success: true});
  } catch(e) {
    return Response.json({error: 'Email exists'}, {status: 400});
  }
}