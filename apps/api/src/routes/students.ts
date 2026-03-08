import { Hono } from "hono"

export const students = new Hono()

students.get("/", async (c) => {

 const { results } = await c.env.DB.prepare(
   "SELECT * FROM students"
 ).all()

 return c.json(results)
})