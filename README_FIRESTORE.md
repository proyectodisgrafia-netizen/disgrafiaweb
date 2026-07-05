### Firestore usage

This branch implements basic students CRUD using Firebase Firestore and server-side verification of ID tokens.

- API routes: /api/students (GET, POST) and /api/students/:id (GET, PUT, DELETE)
- Authentication: client uses Firebase Auth; API verifies ID token with firebase-admin
- Collections used: `users` (store roles like "admin"/"docente"), `students`

Remember to set FIREBASE_ADMIN_* environment variables for server verification.
