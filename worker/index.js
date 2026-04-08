// worker/index.js

// Simplified key for API access (In production, this should be secure)
const ADMIN_API_KEY = 'YOUR_SECRET_API_KEY_HERE'; 

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Allow CORS for frontend dev
  };

  // --- Authentication Middleware (Very Basic) ---
  if (path.startsWith('/api/admin') && request.method === 'POST') {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
    }
    // Logic for updating content goes here...
    return new Response(JSON.stringify({ message: "Admin action successful (Update not fully implemented)" }), { status: 200, headers });
  }
  
  // --- Public Content Fetching ---
  if (path.startsWith('/api/content/')) {
    const contentKey = path.split('/').pop();

    if (!contentKey) {
        return new Response(JSON.stringify({ error: "Missing content key" }), { status: 400, headers });
    }

    try {
      // NOTE: DB stands for the D1 binding object configured in the Worker environment
      const { results } = await DB.prepare(`SELECT content_text, content_image_data_url FROM site_content WHERE content_key = ? LIMIT 1`)
          .bind(contentKey)
          .first();

      if (results) {
        return new Response(JSON.stringify(results), { status: 200, headers });
      } else {
        return new Response(JSON.stringify({ error: "Content not found" }), { status: 404, headers });
      }

    } catch (e) {
      console.error("Database error:", e);
      // In production, don't expose error details. For local development, we can log.
      return new Response(JSON.stringify({ error: "Internal Server Error during data fetch" }), { status: 500, headers });
    }
  }

  return new Response(null, { status: 404 });
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});