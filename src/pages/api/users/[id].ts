import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyIdToken, getFirestore, getAdmin } from '../../../../lib/firebaseAdmin'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' })
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyIdToken(token)
    const uid = decoded.uid

    const db = getFirestore()

    // Only admin can modify user roles
    const requesterDoc = await db.collection('users').doc(uid).get()
    const requesterRole = requesterDoc.exists ? requesterDoc.data()?.role : null
    if (requesterRole !== 'admin') return res.status(403).json({ error: 'Forbidden' })

    const { id } = req.query
    if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Missing id' })

    const docRef = db.collection('users').doc(id)

    if (req.method === 'GET') {
      const doc = await docRef.get()
      if (!doc.exists) return res.status(404).json({ error: 'Not found' })
      return res.json({ id: doc.id, ...doc.data() })
    }

    if (req.method === 'PUT') {
      const { role } = req.body
      if (!role) return res.status(400).json({ error: 'Missing role' })

      await docRef.set({ role, updatedAt: new Date() }, { merge: true })

      // Also attempt to set custom claims for user's auth token
      try {
        const adminApp = getAdmin()
        await adminApp.auth().setCustomUserClaims(id, { role })
      } catch (e) {
        // non-blocking: continue even if setCustomUserClaims fails (may require additional permissions)
        console.warn('setCustomUserClaims failed', e)
      }

      const updated = await docRef.get()
      return res.json({ id: updated.id, ...updated.data() })
    }

    if (req.method === 'DELETE') {
      await docRef.delete()
      return res.status(204).end()
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}

export default handler
