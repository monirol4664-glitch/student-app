import { Hono } from 'hono';

const app = new Hono<{ Bindings: { DB: D1Database } }>();

app.get('/api/students', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM students').all();
  return c.json(results);
});

app.post('/api/students', async (c) => {
  const body = await c.req.json();
  const { name, email, enrollment_date } = body;
  await c.env.DB.prepare(
    'INSERT INTO students (name, email, enrollment_date) VALUES (?, ?, ?)'
  ).bind(name, email, enrollment_date).run();
  return c.json({ success: true });
});

export default app;
