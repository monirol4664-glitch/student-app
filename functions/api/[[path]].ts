import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

const app = new Hono<{ Bindings: { DB: D1Database } }>().basePath('/api')

// Test route to see if the app is alive
app.get('/ping', (c) => c.json({ message: 'Student App Backend is Live!' }))

export const onRequest = handle(app)
