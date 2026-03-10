import Link from "next/link"

export default function Contact() {
  return (
    <div style={{padding:"40px"}}>
      <h1>Contact Us</h1>

      <p>Email: info@globaluniversity.edu</p>
      <p>Phone: +880 123456789</p>

      <Link href="/">Back to Home</Link>
    </div>
  )
}