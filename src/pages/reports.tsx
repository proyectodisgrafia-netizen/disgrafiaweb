import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { onAuthChange, getIdToken } from '../lib/firebaseClient'

type Student = { id: string; name: string }

export default function ReportsPage() {
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

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
      if (!res.ok) throw new Error('Failed to load students')
      const data = await res.json()
      setStudents(data.students || [])
    } catch (err: any) {
      setMessage(err.message)
    } finally { setLoading(false) }
  }

  async function generateReport(studentId: string) {
    try {
      setMessage('Generando reporte...')
      const token = await getIdToken()
      const res = await fetch('/api/reports/generate', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ studentId }) })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Failed to generate')
      }
      const data = await res.json()
      setMessage('Reporte generado. Abriendo...')
      window.open(data.url, '_blank')
    } catch (err: any) {
      setMessage(err.message)
    }
  }

  return (
    <div>
      <Nav />
      <main className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold">Reportes</h2>
        {!user && <p className="mt-4">Debes iniciar sesión para generar reportes.</p>}
        {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}

        {user && (
          <div className="mt-4">
            {loading ? <p>Cargando...</p> : (
              <table className="w-full mt-2 table-auto">
                <thead>
                  <tr className="text-left">
                    <th>Nombre</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id} className="border-t">
                      <td className="py-2">{s.name}</td>
                      <td className="py-2"><button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => generateReport(s.id)}>Generar PDF</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
