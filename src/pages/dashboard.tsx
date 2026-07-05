import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { onAuthChange, getCurrentUser } from '../lib/firebaseClient'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      setUser(u)
    })
    return () => unsub()
  }, [])

  return (
    <div>
      <Nav />
      <main className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        {user ? (
          <div className="mt-4">
            <p>Bienvenido, {user.email}</p>
            <p className="text-sm text-slate-600">UID: {user.uid}</p>
          </div>
        ) : (
          <p className="mt-4">No autenticado</p>
        )}
      </main>
    </div>
  )
}
