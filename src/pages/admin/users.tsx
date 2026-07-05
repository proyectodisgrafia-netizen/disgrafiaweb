import { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { onAuthChange, getIdToken } from '../../lib/firebaseClient'

type UserItem = { id: string; email?: string; role?: string }

export default function AdminUsersPage() {
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      setUser(u)
      if (u) await loadUsers()
    })
    return () => unsub()
  }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      const token = await getIdToken()
      const res = await fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Failed to load')
      }
      const data = await res.json()
      setUsers(data.users || [])
    } catch (err: any) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  async function updateRole(id: string, role: string) {
    try {
      setError(null)
      const token = await getIdToken()
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role })
      })
      if (!res.ok) throw new Error('Failed to update')
      await loadUsers()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Nav />
      <main className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold">Administración de Usuarios</h2>
        {!user && <p className="mt-4">Debes iniciar sesión como administrador para ver y gestionar usuarios.</p>}

        {user && (
          <div className="mt-4">
            {loading ? <p>Cargando...</p> : (
              <table className="w-full mt-2 table-auto">
                <thead>
                  <tr className="text-left">
                    <th>UID</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-t">
                      <td className="py-2 align-top"><code className="text-xs">{u.id}</code></td>
                      <td className="py-2">{u.email || '-'}</td>
                      <td className="py-2">{u.role || '-'}</td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          <button className="px-2 py-1 bg-blue-600 text-white rounded text-sm" onClick={() => updateRole(u.id, 'docente')}>Docente</button>
                          <button className="px-2 py-1 bg-green-600 text-white rounded text-sm" onClick={() => updateRole(u.id, 'admin')}>Admin</button>
                          <button className="px-2 py-1 bg-red-600 text-white rounded text-sm" onClick={() => updateRole(u.id, '')}>Remover rol</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        )}
      </main>
    </div>
  )
}
