import { Hono } from "hono"

export const courses = new Hono()

courses.get("/", async (c) => {

 const { results } = await c.env.DB.prepare(
   "SELECT * FROM courses"
 ).all()

 return c.json(results)
})