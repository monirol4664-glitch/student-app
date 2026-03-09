export async function onRequest(context) {
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM faculty ORDER BY department, name"
    ).all();
    
    // Add proper caching headers for better performance
    return new Response(JSON.stringify(results), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60' // Cache for 60 seconds
      }
    });
  } catch (error) {
    // Better error logging
    console.error('D1 Error:', error.message);
    return new Response(JSON.stringify({ 
      error: 'Database error', 
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}