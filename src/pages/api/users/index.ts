import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyIdToken, getFirestore } from '../../../lib/firebaseAdmin'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' })
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyIdToken(token)
    const uid = decoded.uid

    const db = getFirestore()

    // Only admin can list users
    const requesterDoc = await db.collection('users').doc(uid).get()
    const requesterRole = requesterDoc.exists ? requesterDoc.data()?.role : null
    if (requesterRole !== 'admin') return res.status(403).json({ error: 'Forbidden' })

    if (req.method === 'GET') {
      const snap = await db.collection('users').orderBy('createdAt', 'desc').get()
      const users = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      return res.json({ users })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}

export default handler
