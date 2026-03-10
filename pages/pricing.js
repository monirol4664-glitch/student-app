import Link from "next/link"

export default function Pricing() {
  return (
    <div style={{padding:"40px"}}>
      <h1>Pricing</h1>

      <ul>
        <li>Free Plan - $0</li>
        <li>Pro Plan - $10/month</li>
        <li>Enterprise - Contact us</li>
      </ul>

      <Link href="/">Back Home</Link>
    </div>
  )
}