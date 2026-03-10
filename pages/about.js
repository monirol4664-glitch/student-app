import Link from "next/link"

export default function About() {
  return (
    <div style={{padding:"40px"}}>
      <h1>About Global University</h1>
      <p>
        Global University is committed to providing high quality education
        and research opportunities.
      </p>

      <Link href="/">Back to Home</Link>
    </div>
  )
}