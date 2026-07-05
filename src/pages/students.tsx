import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { onAuthChange, getIdToken } from '../lib/firebaseClient'

type Student = { id: string; name: string; dob?: string }

export default function StudentsPage() {
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      setUser(u)
      if (u) await loadStudents()
    })
    return () => unsub()
  }, [])

  async function loadStudents() {
    try {
      setLoading(true)
      const token = await getIdToken()
      const res = await fetch('/api/students', { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setStudents(data.students || [])
    } catch (err: any) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const token = await getIdToken()
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, dob })
      })
      if (!res.ok) throw new Error('Failed to create')
      setName('')
      setDob('')
      await loadStudents()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Nav />
      <main className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold">Estudiantes</h2>

        {!user && <p className="mt-4">Debes iniciar sesión para ver y crear estudiantes.</p>}

        {user && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <section className="col-span-2">
              <h3 className="font-medium">Lista</h3>
              {loading ? <p>Cargando...</p> : (
                <table className="w-full mt-2 table-auto">
                  <thead>
                    <tr className="text-left">
                      <th>Nombre</th>
                      <th>Fecha de nacimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(s => (
                      <tr key={s.id} className="border-t">
                        <td className="py-2">{s.name}</td>
                        <td className="py-2">{s.dob ? new Date(s.dob).toLocaleDateString() : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            <section>
              <h3 className="font-medium">Crear estudiante</h3>
              <form onSubmit={handleCreate} className="mt-2">
                <label className="block">
                  <span className="text-sm">Nombre</span>
                  <input value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded border p-2" />
                </label>
                <label className="block mt-3">
                  <span className="text-sm">Fecha de nacimiento</span>
                  <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="mt-1 block w-full rounded border p-2" />
                </label>
                {error && <p className="text-red-600 mt-2">{error}</p>}
                <div className="mt-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded" type="submit">Crear</button>
                </div>
              </form>
            </section>
          </div>
        )}

      </main>
    </div>
  )
}
