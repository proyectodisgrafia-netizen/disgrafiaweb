import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword as fbSignIn, createUserWithEmailAndPassword as fbRegister, signOut as fbSignOut, onAuthStateChanged as fbOnAuthStateChanged } from 'firebase/auth'

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export function firebaseClientApp() {
  if (!getApps().length) {
    return initializeApp(clientCredentials)
  }
  return getApp()
}

const app = firebaseClientApp()
const auth = getAuth(app)

export const firebaseAuth = auth

export async function signIn(email: string, password: string) {
  const userCredential = await fbSignIn(auth, email, password)
  return userCredential.user
}

export async function register(email: string, password: string) {
  const userCredential = await fbRegister(auth, email, password)
  return userCredential.user
}

export async function signOut() {
  return fbSignOut(auth)
}

export function onAuthChange(cb: (user: any) => void) {
  return fbOnAuthStateChanged(auth, cb)
}

export async function getCurrentUser() {
  return auth.currentUser
}
