

# Crypchat

Talk freely, chat securely. A full-stack chat application built with MongoDB, Express, React (Vite), Node.js, and Stream Chat. Auth is cookie-based (HTTP-only), email via SendGrid, and the client is served by the Node server in production.

## ✨ Features

- Secure auth: signup/login/logout, JWT in HTTP-only cookies
- Forgot/Reset password via email (SendGrid)
- Onboarding with profile image & details
- Friends system: requests, accept, recommended users
- 1–1 chat powered by Stream Chat
- Responsive UI with Tailwind + daisyUI
- Mobile sidebar (slide-in) and channel list w/ message preview truncation
- Production build served by Express (/frontend/dist)
- Dev mode uses Vite proxy → Node API for zero CORS pain

## 🧰 Tech Stack

- Frontend: React (Vite), React Router, TanStack Query, Tailwind, daisyUI, lucide-react
- Backend: Node.js, Express, MongoDB (Mongoose)
- Chat: Stream Chat SDK
- Email: SendGrid
- Auth: JWT + HTTP-only cookies
- Deploy: Render (single service serving API + static frontend)

## 🗂️ Project Structure

```bash
Crypchat/
├─ backend/
│  ├─ src/
│  │  ├─ config/        # db, env
│  │  ├─ controllers/   # auth, user, chat
│  │  ├─ middleware/    # auth middleware
│  │  ├─ routes/        # /api/v1/*
│  │  ├─ utils/         # email helpers, responses
│  │  └─ server.js      # Express app (serves frontend in prod)
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ components/    # Navbar, Sidebar, etc.
│  │  ├─ hooks/         # useAuthUser, useLogout
│  │  ├─ pages/         # ChatHomePage, Auth pages
│  │  └─ utils/         # axios instance, api wrappers
│  ├─ index.html
│  ├─ vite.config.ts/js # dev proxy to backend
│  └─ package.json
├─ package.json          # root scripts (build/start)
└─ README.md
```

## 🔑 Environment Variables

Create two `.env` files (never commit them):

`backend/.env`

```ini
PORT=5001
MONGODB_URI=your-mongodb-uri
JWT_SECRET_KEY=your-jwt-secret
STREAM_API_KEY=your-stream-api-key
STREAM_API_SECRET=your-stream-api-secret
SENDGRID_API_KEY=your-sendgrid-api-key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

In production set:

```ini
CLIENT_URL=https://your-domain.tld
NODE_ENV=production
```

and configure Render Environment accordingly.

`frontend/.env`

```ini
VITE_STREAM_API_KEY=your-stream-api-key
```

## ▶️ Run Locally (Development)

Open two terminals:

1.  Backend

    ```bash
    cd backend
    npm i
    npm run dev        # or nodemon src/server.js
    ```

2.  Frontend

    ```bash
    cd frontend
    npm i
    npm run dev
    ```

**Important (Vite proxy):** your `vite.config` should proxy to the backend:

```ts
// vite.config.ts/js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },
});
```

**axios base URL (frontend)**

```ts
// src/utils/axios.ts/js
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "/api/v1",      // always relative; Vite proxy handles dev
  withCredentials: true,   // send cookies
});
```

This way:

- Dev → requests hit `http://localhost:5173/api/v1` and get proxied to `http://localhost:5001`.
- Prod → the same relative `/api/v1` is served by Express (no hardcoded origin).

## 🚀 Build & Run (Production / Render)

Your repo already serves the Vite build from Express:

In `backend/src/server.js`:

- Serves `../frontend/dist` when `NODE_ENV === "production"`
- API under `/api/v1/*`

Typical Render setup:

- **Build command (root
