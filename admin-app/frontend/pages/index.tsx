import Link from 'next/link'

export default function Home() {
  return (
    <main style={{padding:40}}>
      <h1>Admin App (Scaffold)</h1>
      <p>Welcome — use <Link href="/login">Login</Link> to sign in.</p>
    </main>
  )
}
