export async function onRequest(context) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    const { results } = await context.env.DB.prepare(`
      SELECT * FROM news 
      ORDER BY published_date DESC 
      LIMIT 10
    `).all();
    
    return new Response(JSON.stringify(results), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers 
    });
  }
}