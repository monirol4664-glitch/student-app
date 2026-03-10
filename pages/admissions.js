import Link from "next/link"

export default function Admissions() {
  return (
    <div style={{padding:"40px"}}>
      <h1>Admissions</h1>

      <p>Applications are open for the following programs:</p>

      <ul>
        <li>Bachelor of Computer Science</li>
        <li>Bachelor of Business Administration</li>
        <li>Master of Data Science</li>
      </ul>

      <Link href="/">Back to Home</Link>
    </div>
  )
}