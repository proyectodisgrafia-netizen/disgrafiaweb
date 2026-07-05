### Reports

This branch adds a simple PDF report generator API and a UI page to create reports for students.

- POST /api/reports/generate
  - Body: { studentId }
  - Requires Authorization: Bearer <idToken>
  - Checks requester role (admin/docente)
  - Generates a simple PDF containing student info and assessments, saves it to Firebase Storage, and returns a signed URL valid for 1 hour.

- UI: /reports
  - Lists students and provides a "Generar PDF" button for each.

Notes:
- Ensure Firebase Storage bucket is configured (NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET and service account permissions for storage).
- pdfkit is used to build the PDF in memory.
