import Link from "next/link"

export default function Departments() {
  return (
    <div style={{padding:"40px"}}>
      <h1>Departments</h1>

      <ul>
        <li>Computer Science</li>
        <li>Business Administration</li>
        <li>Engineering</li>
        <li>Mathematics</li>
      </ul>

      <Link href="/">Back to Home</Link>
    </div>
  )
}