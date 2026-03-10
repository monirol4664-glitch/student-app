import Link from "next/link"

export default function Home() {
  return (
    <div style={{fontFamily:"Arial",padding:"40px"}}>
      <h1>Global University</h1>
      <p>Welcome to our official university website.</p>

      <nav>
        <Link href="/about">About</Link> |{" "}
        <Link href="/admissions">Admissions</Link> |{" "}
        <Link href="/departments">Departments</Link> |{" "}
        <Link href="/contact">Contact</Link>
      </nav>

      <h2>Why Choose Us</h2>
      <ul>
        <li>Experienced Faculty</li>
        <li>Modern Campus</li>
        <li>International Programs</li>
      </ul>
    </div>
  )
}