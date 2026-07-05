import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyIdToken, getFirestore, getAdmin } from '../../../lib/firebaseAdmin'
import PDFDocument from 'pdfkit'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' })
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyIdToken(token)
    const uid = decoded.uid

    const { studentId } = req.body
    if (!studentId) return res.status(400).json({ error: 'Missing studentId' })

    const db = getFirestore()
    const requesterDoc = await db.collection('users').doc(uid).get()
    const role = requesterDoc.exists ? requesterDoc.data()?.role : null
    if (!['admin', 'docente'].includes(role)) return res.status(403).json({ error: 'Forbidden' })

    const studentDoc = await db.collection('students').doc(studentId).get()
    if (!studentDoc.exists) return res.status(404).json({ error: 'Student not found' })
    const student = studentDoc.data()

    // Fetch assessments if any
    const assessmentsSnap = await db.collection('assessments').where('studentId', '==', studentId).orderBy('date', 'desc').get()
    const assessments = assessmentsSnap.docs.map(d => d.data())

    // Generate PDF in memory
    const doc = new PDFDocument({ size: 'A4', margin: 50 })
    const chunks: Buffer[] = []
    doc.on('data', (chunk) => chunks.push(Buffer.from(chunk)))

    doc.fontSize(20).text('Informe de evaluación', { align: 'center' })
    doc.moveDown()
    doc.fontSize(12).text(`Nombre: ${student?.name || '-'}`)
    if (student?.dob) doc.text(`Fecha de nacimiento: ${new Date(student.dob._seconds ? student.dob._seconds * 1000 : student.dob).toLocaleDateString()}`)
    doc.text(`Generado por: ${uid}`)
    doc.text(`Fecha: ${new Date().toLocaleString()}`)
    doc.moveDown()

    doc.fontSize(14).text('Evaluaciones', { underline: true })
    doc.moveDown(0.5)

    if (assessments.length === 0) {
      doc.fontSize(12).text('No hay evaluaciones registradas.')
    } else {
      assessments.forEach((a: any, i: number) => {
        doc.fontSize(12).text(`${i + 1}. Tipo: ${a.type || '-'} | Fecha: ${a.date ? (a.date._seconds ? new Date(a.date._seconds * 1000).toLocaleDateString() : new Date(a.date).toLocaleDateString()) : '-'} `)
        doc.text(`   Puntuación: ${a.score ?? '-'} `)
        if (a.details) doc.text(`   Detalles: ${typeof a.details === 'string' ? a.details : JSON.stringify(a.details)}`)
        doc.moveDown(0.5)
      })
    }

    doc.end()

    await new Promise((resolve, reject) => {
      doc.on('end', resolve)
      doc.on('error', reject)
    })

    const pdfBuffer = Buffer.concat(chunks)

    // Save to Firebase Storage
    const adminApp = getAdmin()
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || undefined
    const bucket = bucketName ? adminApp.storage().bucket(bucketName) : adminApp.storage().bucket()
    const filePath = `reports/${studentId}-${Date.now()}.pdf`
    const file = bucket.file(filePath)

    await file.save(pdfBuffer, { contentType: 'application/pdf' })

    // Generate signed URL valid for 1 hour (use Date object)
    const [url] = await file.getSignedUrl({ action: 'read', expires: new Date(Date.now() + 60 * 60 * 1000) })

    return res.json({ url })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}

export default handler
