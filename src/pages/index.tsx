import Nav from '../components/Nav'

export default function Home() {
  return (
    <div>
      <Nav />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold">Bienvenido a DisgrafiaWeb</h1>
        <p className="mt-4">Esta rama inicia el MVP con Firebase Authentication.</p>
      </main>
    </div>
  )
}
