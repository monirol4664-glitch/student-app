import { Hono } from "hono"
import { cors } from "hono/cors"

type Bindings = {
  DB: D1Database
  CACHE: KVNamespace
  BUCKET: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

app.use("*", cors())

app.get("/", (c) => {
  return c.text("Student App API running")
})

export default app