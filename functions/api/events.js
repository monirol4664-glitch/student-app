export async function onRequest(context) {
  try {
    const { results } = await context.env.DB.prepare(`
      SELECT * FROM events 
      WHERE start_date >= datetime('now')
      ORDER BY start_date ASC
      LIMIT 10
    `).all();
    
    return new Response(JSON.stringify(results), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Events API Error:', error.message);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch events',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}