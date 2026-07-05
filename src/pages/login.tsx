import { useState } from 'react'
import { useRouter } from 'next/router'
import { firebaseAuth, signIn, register } from '../lib/firebaseClient'
import Nav from '../components/Nav'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      if (isRegister) {
        await register(email, password)
      } else {
        await signIn(email, password)
      }
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Nav />
      <main className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold">{isRegister ? 'Registro' : 'Iniciar sesión'}</h2>
        <form onSubmit={handleSubmit} className="mt-4 max-w-md">
          <label className="block">
            <span className="text-sm">Correo</span>
            <input className="mt-1 block w-full rounded border p-2" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label className="block mt-4">
            <span className="text-sm">Contraseña</span>
            <input type="password" className="mt-1 block w-full rounded border p-2" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">{isRegister ? 'Registrar' : 'Entrar'}</button>
            <button type="button" className="px-4 py-2 border rounded" onClick={() => setIsRegister(v => !v)}>{isRegister ? 'Ir a login' : 'Crear cuenta'}</button>
          </div>
        </form>
      </main>
    </div>
  )
}
