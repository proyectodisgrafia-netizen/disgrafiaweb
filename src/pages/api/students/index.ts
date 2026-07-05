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

    if (req.method === 'GET') {
      const snap = await db.collection('students').orderBy('createdAt', 'desc').get()
      const students = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      return res.json({ students })
    }

    if (req.method === 'POST') {
      // Optional: role check (docente/admin)
      const userDoc = await db.collection('users').doc(uid).get()
      const role = userDoc.exists ? userDoc.data()?.role : 'docente'
      if (!['docente', 'admin'].includes(role)) return res.status(403).json({ error: 'Forbidden' })

      const { name, dob } = req.body
      if (!name) return res.status(400).json({ error: 'Missing name' })

      const newDoc = await db.collection('students').add({
        name,
        dob: dob ? new Date(dob) : null,
        createdAt: new Date(),
        createdBy: uid,
      })

      const created = await newDoc.get()
      return res.status(201).json({ id: created.id, ...created.data() })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}

export default handler
