import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

export const POST: APIRoute = async ({ request, env }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decoded: any;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    const body = await request.json();
    const { password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await env.DB.prepare(
        'UPDATE admin_users SET password_hash = ? WHERE id = ?'
    ).bind(hashedPassword, decoded.id).run();

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};