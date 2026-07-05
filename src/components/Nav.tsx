import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="p-4 bg-slate-800 text-white">
      <div className="container mx-auto flex gap-4">
        <Link href="/"><a className="font-bold">DisgrafiaWeb</a></Link>
        <Link href="/login"><a>Login</a></Link>
        <Link href="/dashboard"><a>Dashboard</a></Link>
      </div>
    </nav>
  )
}
