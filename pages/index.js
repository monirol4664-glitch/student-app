import Link from "next/link"

export default function Home() {
  return (
    <div style={{fontFamily:"Arial",padding:"40px"}}>
      <h1>My SaaS Landing Page</h1>
      <p>Hosted on Cloudflare</p>

      <nav>
        <Link href="/about">About</Link> |{" "}
        <Link href="/pricing">Pricing</Link> |{" "}
        <Link href="/contact">Contact</Link>
      </nav>

      <h2>Features</h2>
      <ul>
        <li>Fast global CDN</li>
        <li>Edge rendering</li>
        <li>SEO friendly</li>
      </ul>
    </div>
  )
}