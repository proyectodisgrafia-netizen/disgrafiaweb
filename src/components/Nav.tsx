import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="p-4 bg-slate-800 text-white">
      <div className="container mx-auto flex gap-4">
        <Link href="/" className="font-bold">DisgrafiaWeb</Link>
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  )
}
