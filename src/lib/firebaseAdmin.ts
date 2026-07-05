import admin from 'firebase-admin'

const getAdmin = () => {
  if (admin.apps && admin.apps.length) return admin.app()

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY ? JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY) : undefined

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase admin credentials in environment')
  }

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

export async function verifyIdToken(idToken: string) {
  const app = getAdmin()
  return app.auth().verifyIdToken(idToken)
}
