export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
    const query = url.searchParams.get('q');
    
    if (!query) {
      return new Response(JSON.stringify({ error: 'Search query required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Search across multiple tables using UNION
    const { results } = await context.env.DB.prepare(`
      SELECT 'faculty' as type, name as title, department as category, id 
      FROM faculty WHERE name LIKE ? OR bio LIKE ?
      UNION
      SELECT 'course' as type, title, department as category, id 
      FROM courses WHERE title LIKE ? OR description LIKE ?
      UNION
      SELECT 'news' as type, title, category, id 
      FROM news WHERE title LIKE ? OR content LIKE ?
      LIMIT 20
    `).bind(
      `%${query}%`, `%${query}%`,  // faculty search
      `%${query}%`, `%${query}%`,  // courses search
      `%${query}%`, `%${query}%`    // news search
    ).all();
    
    return new Response(JSON.stringify(results), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30'
      }
    });
  } catch (error) {
    console.error('Search Error:', error.message);
    return new Response(JSON.stringify({ error: 'Search failed' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}