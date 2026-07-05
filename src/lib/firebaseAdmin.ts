import admin from 'firebase-admin'

const getAdmin = () => {
  if (admin.apps && admin.apps.length) return admin.app()

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  // PRIVATE_KEY can contain literal newlines; handle both raw and JSON-parsed formats
  let privateKey: string | undefined = undefined
  if (process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
    try {
      // If the key was stored as a JSON string
      privateKey = JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY)
    } catch (e) {
      // Otherwise it's a plain string with \n
      privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
  }

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

export function getFirestore() {
  const app = getAdmin()
  return app.firestore()
}
