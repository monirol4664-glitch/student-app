import Link from "next/link"

export default function Navbar() {
 return (
  <nav>

   <Link href="/">Home</Link>{" | "}
   <Link href="/about">About</Link>{" | "}
   <Link href="/departments">Departments</Link>{" | "}
   <Link href="/notices">Notices</Link>

  </nav>
 )
}