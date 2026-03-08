export async function onRequestPost({request}) {
  // TEMP TEST - Ignore database
  const headers = new Headers();
  headers.append('Set-Cookie', `session=test123; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`);
  headers.append('Content-Type', 'application/json');
  return new Response(JSON.stringify({success: true}), {status: 200, headers});
}