import Link from "next/link"

export default function About() {
  return (
    <div style={{padding:"40px"}}>
      <h1>About Us</h1>
      <p>This is a simple Next.js site deployed on Cloudflare.</p>

      <Link href="/">Back Home</Link>
    </div>
  )
}