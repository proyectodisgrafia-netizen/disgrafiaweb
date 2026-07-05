import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyIdToken, getFirestore } from '../../../../lib/firebaseAdmin'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' })
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyIdToken(token)
    const uid = decoded.uid

    const db = getFirestore()
    const { id } = req.query
    if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Missing id' })

    const docRef = db.collection('students').doc(id)

    if (req.method === 'GET') {
      const doc = await docRef.get()
      if (!doc.exists) return res.status(404).json({ error: 'Not found' })
      return res.json({ id: doc.id, ...doc.data() })
    }

    // For PUT and DELETE, check roles
    const userDoc = await db.collection('users').doc(uid).get()
    const role = userDoc.exists ? userDoc.data()?.role : 'docente'
    if (!['docente', 'admin'].includes(role)) return res.status(403).json({ error: 'Forbidden' })

    if (req.method === 'PUT') {
      const { name, dob } = req.body
      await docRef.update({
        ...(name ? { name } : {}),
        ...(dob ? { dob: new Date(dob) } : {}),
        updatedAt: new Date(),
        updatedBy: uid,
      })
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
