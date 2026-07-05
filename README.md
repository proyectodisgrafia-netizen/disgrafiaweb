# Disgrafiaweb

Proyecto inicial: base Next.js + Firebase Auth

Setup rápido:
1. Copia .env.example -> .env.local y llena las variables de Firebase y DATABASE_URL.
2. npm install
3. npm run dev

Decisiones por defecto en esta rama:
- Next.js + TypeScript
- Tailwind CSS
- Firebase Authentication (cliente) + Firebase Admin (server token verification)
- Prisma es considerado pero no está totalmente configurado aún

Siguientes pasos que implementaré:
- Conexión a la base de datos y modelos (Prisma)
- Panel de autenticación y protección de rutas
- CRUD básico de estudiantes
