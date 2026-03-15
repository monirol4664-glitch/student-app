export async function onRequestGet(context) {
  const { request, env, params } = context;
  const { studentId } = params;

  // Optional: add auth check here if you want only logged-in users to view profiles

  try {
    const profile = await env.DB.prepare(
      "SELECT student_id, full_name, department, batch, created_at FROM students WHERE student_id = ?"
    ).bind(studentId).first();

    if (!profile) {
      return new Response("Student not found", { status: 404 });
    }

    return Response.json(profile);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}