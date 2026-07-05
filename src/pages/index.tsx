import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    // Replace history so the back button doesn't return here
    router.replace('/login')
  }, [router])

  return null
}
