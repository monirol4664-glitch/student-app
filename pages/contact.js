import Link from "next/link"

export default function Contact() {
  return (
    <div style={{padding:"40px"}}>
      <h1>Contact</h1>

      <p>Email: support@example.com</p>

      <Link href="/">Back Home</Link>
    </div>
  )
}