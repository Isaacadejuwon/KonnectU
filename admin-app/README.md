# Admin App (local scaffold)

This folder contains a lightweight scaffold for the Admin Webapp:

- `frontend/` — Next.js + TypeScript admin UI (scaffolded minimal files)
- `backend/` — Small Node/Express proxy service that forwards auth/API calls to the main backend and holds admin-specific server-side helpers

Next steps:
1. Install dependencies in each folder (`npm install`).
2. Wire `BACKEND_URL` in `backend/.env` to your running backend (the existing repo).
3. Implement auth + RBAC integration in the frontend to call backend auth endpoints and require `admin` role.
4. Add 2FA UI and backend hooks (OTP) to match backend `OtpService` endpoints.

This is an initial scaffold. Run `README.md` in each subfolder for details.