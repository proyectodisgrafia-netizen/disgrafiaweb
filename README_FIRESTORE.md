### Firestore rules and Admin UI

Added files in this branch:
- firestore.rules: recommended rules to enforce roles using the `users` collection.
- firestore.indexes.json: placeholder for indexes.
- API endpoints: /api/users and /api/users/:id (admin-only) to list and manage users.
- Frontend admin page: /admin/users to list users and change roles.

Notes:
- The endpoints expect the caller to pass Authorization: Bearer <idToken> header from Firebase client.
- The server will attempt to set custom claims when changing roles (may require appropriate service account permissions).
- Create an admin user manually by adding a document in the `users` collection with id equal to the user's uid and role: 'admin', or run a script to seed the admin.
