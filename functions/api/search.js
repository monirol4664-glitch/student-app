export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
    const query = url.searchParams.get('q');
    
    if (!query || query.length < 2) {
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const searchTerm = `%${query}%`;
    
    const { results } = await context.env.DB.prepare(`
      SELECT 'faculty' as type, name as title, department as category, id 
      FROM faculty WHERE name LIKE ? OR bio LIKE ? OR research_interests LIKE ?
      UNION
      SELECT 'course' as type, title, department as category, id 
      FROM courses WHERE title LIKE ? OR description LIKE ?
      UNION
      SELECT 'news' as type, title, category, id 
      FROM news WHERE title LIKE ? OR content LIKE ?
      LIMIT 20
    `).bind(
      searchTerm, searchTerm, searchTerm,  // faculty search (3 params)
      searchTerm, searchTerm,               // courses search (2 params)
      searchTerm, searchTerm                // news search (2 params)
    ).all();
    
    return new Response(JSON.stringify(results), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30' // Short cache for search
      }
    });
  } catch (error) {
    console.error('Search API Error:', error.message);
    return new Response(JSON.stringify({ 
      error: 'Search failed',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}