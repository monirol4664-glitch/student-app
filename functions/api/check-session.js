export async function onRequest(context) {
  const { request, env } = context;
  const cookie = request.headers.get('Cookie') || '';
  
  if (!cookie.includes('session=')) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  return new Response('OK', { status: 200 });
}