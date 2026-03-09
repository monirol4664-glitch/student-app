export async function onRequest(context) {
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM courses ORDER BY department, course_code"
    ).all();
    
    return Response.json(results);
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}