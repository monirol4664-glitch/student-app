export async function onRequest(context) {
  // Enable CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM faculty ORDER BY department, name"
    ).all();
    
    return new Response(JSON.stringify(results), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers 
    });
  }
}