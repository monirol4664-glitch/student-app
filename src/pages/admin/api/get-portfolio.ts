import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ env }) => {
    try {
        const settings = await env.DB.prepare(
            'SELECT key, value FROM portfolio_settings'
        ).all();

        const projects = await env.DB.prepare(
            'SELECT id, title, description, tech_stack, image_data, link, featured, created_at, updated_at FROM projects ORDER BY featured DESC, created_at DESC'
        ).all();

        const portfolioData = {
            settings: settings.results.reduce((acc: any, row: any) => {
                acc[row.key] = row.value;
                return acc;
            }, {}),
            projects: projects.results.map((p: any) => ({
                ...p,
                tech_stack: p.tech_stack ? JSON.parse(p.tech_stack) : []
            }))
        };

        return new Response(JSON.stringify(portfolioData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};