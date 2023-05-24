import Link from "next/link"

export default function Home() {
  return (
    <div style={{ display: "flex", gap: "1em" }}>
      <Link href="/staff">Staff</Link>
      <Link href="/mentor">Mentor</Link>
      <Link href="/curator">Curator</Link>
      <Link href="/candidate">Candidate</Link>
    </div>
  )
}
