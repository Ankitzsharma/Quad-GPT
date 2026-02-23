# QuadGPT

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0-green)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5.x-black)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)

QuadGPT is an Generative Artificial Intelligence
Chatbot/Chat-based application inspired by modern AI
Conversational systems like ChatGPT, Perplexity.

# Live Demo :
[https://quadgpt-frontend-1.onrender.com/](https://quadgpt-frontend-1.onrender.com/)

A full‑stack GenAI chat application with secure authentication, 
persistent threaded conversations, theme toggle, and a clean, 
responsive UI. Built with React (Vite) and Express/MongoDB, 
integrated with the Perplexity API for assistant responses.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Development](#development)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Features

- Secure login and registration with JWT; protected API endpoints scoped per user
- Persistent threads in MongoDB; each thread stores user and assistant message history
- Markdown rendering with syntax highlighting for code blocks
- Light/Dark theme toggle with preference persisted to localStorage
- Enhanced dropdown with model multi‑select and session actions
- Redesigned sidebar:
  - Brand header and gradient “New Chat” button
  - Search conversations and “Recent Chats” list with timestamps
  - Dark Mode toggle
- Upgrade plan overlay page (modal) with responsive cards
- Environment‑driven API base for flexible deployment
- Fully responsive layout for desktop, tablet, and mobile

Screenshots (add your assets):

- Sidebar: `src/assets/GPT.png` (dark), `src/assets/GPT2.png` (light)
- Upgrade Plan overlay: `Frontend/src/UpgradePlan.jsx` (use OS screenshot/GIF)

---

## Installation

### Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB Atlas (or local MongoDB)

### Clone and install

```bash
# from the project root
git clone <your-repo-url>
cd QuadGPT

# install backend
cd Backend
npm install

# install frontend
cd ../Frontend
npm install
```

### Environment variables

Create `Backend/.env`:

```env
MONGODB_URI=<your-mongodb-uri>
PERPLEXITY_API_KEY=<your-perplexity-api-key>
JWT_SECRET=<your-strong-secret>
PORT=8080
```

Create `Frontend/.env` (or `.env.local`):

```env
VITE_API_BASE=http://localhost:8080
```

> Do not commit secrets to version control. `.gitignore` already excludes environment files.

### Database setup

- Ensure the `MONGODB_URI` points to a valid database
- Collections:
  - `users` (email, passwordHash, role)
  - `threads` (userId, threadId, title, messages[], timestamps)

---

## Usage

### Start servers

```bash
# backend
cd Backend
npm start

# frontend
cd ../Frontend
npm run dev
```

Open the app at the URL printed by Vite (usually `http://localhost:5173`).

### Login/Register

- Use the login page to register a new account or authenticate
- The JWT is stored in `localStorage` and used for protected routes

### Send a message

- Type in the input box and hit Enter or click the paper plane icon
- The app calls `POST /api/chat` with your `threadId` and message, persists both sides of the conversation, and displays the assistant reply with a typing effect

### Common commands

```bash
# Frontend
npm run dev       # launch dev server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # lint code

# Backend
npm start         # start Express server
```

### Configuration options

- Theme: toggle via dropdown or sidebar switch; persisted to localStorage
- Models: multi‑select in dropdown (example values are visual only)
- API base: set `VITE_API_BASE` to your backend URL

---

## Project Structure

```text
QuadGPT/
├─ Backend/
│  ├─ models/
│  │  ├─ Thread.js          # thread schema with messages and userId
│  │  └─ User.js            # user schema for auth
│  ├─ routes/
│  │  ├─ chat.js            # thread CRUD and chat handling (protected)
│  │  └─ auth.js            # register and login
│  ├─ utils/
│  │  ├─ quorAi.js          # Perplexity API call utility
│  │  └─ auth.js            # JWT helpers and middleware
│  ├─ Server.js             # express app, router mounts, Mongo connection
│  ├─ package.json          # backend deps and scripts
│  └─ .env                  # backend environment (excluded from VCS)
│
├─ Frontend/
│  ├─ src/
│  │  ├─ App.jsx            # context provider and app shell
│  │  ├─ Login.jsx          # authentication UI
│  │  ├─ Sidebar.jsx        # sidebar with brand, search, recent chats
│  │  ├─ ChatWindow.jsx     # navbar, dropdown, input, loader
│  │  ├─ Chat.jsx           # list of messages with typing effect
│  │  ├─ UpgradePlan.jsx    # upgrade plan overlay
│  │  ├─ MyContext.jsx      # React context
│  │  ├─ *.css              # per‑component styles
│  │  └─ assets/            # images (GPT.png, GPT2.png, etc.)
│  ├─ index.html            # app entry document
│  ├─ vite.config.js        # vite configuration
│  ├─ eslint.config.js      # ESLint rules
│  ├─ package.json          # frontend deps and scripts
│  └─ README.md             # this documentation
└─ .gitignore               # ignores node_modules, dist, envs, etc.
```

Important config files:

- `Backend/Server.js`: router mounts, CORS/JSON middleware, MongoDB connection
- `Backend/routes/chat.js`: protected chat/thread endpoints
- `Backend/routes/auth.js`: register/login endpoints
- `Frontend/eslint.config.js`: JS/React linting config
- `Frontend/vite.config.js`: Vite plugins and dev server config

---

## Technology Stack

| Layer     | Tech                                 | Version (approx) | Reasoning                                                     |
|----------|---------------------------------------|------------------|---------------------------------------------------------------|
| Frontend | React + Vite                          | React 19, Vite 7 | Fast dev server, HMR, simple build; modern React features     |
| UI       | CSS files per component               | —                | Lightweight, simple, predictable cascade                      |
| Markdown | `react-markdown`, `rehype-highlight`  | 10.x, 7.x        | Rich markdown rendering with code block highlighting          |
| Backend  | Express                                | 5.x              | Minimal, stable HTTP API                                     |
| DB       | Mongoose + MongoDB Atlas              | 8.x              | Simple schema modeling, hosted persistence                    |
| Auth     | JWT (`jsonwebtoken`), `bcryptjs`      | 9.x, 2.x         | Stateless auth, secure password hashing                       |
| Network  | `axios` (backend), `fetch` (frontend) | 1.x              | Predictable HTTP client; built‑in fetch on frontend           |
| Icons    | Font Awesome (CDN)                    | —                | Drop‑in icons                                                 |

Major choices:

- React + Vite for rapid iteration and efficient bundling
- Express + MongoDB for straightforward REST and flexible document storage
- JWT for stateless, per‑user scoping of threads

---

## Development

### Coding style

- Functional React components with hooks
- Global state via a single `MyContext` provider
- Per‑component CSS files (no CSS‑in‑JS) with `.app.light` overrides for theme
- ESM modules across frontend and backend
- ESLint rules (`Frontend/eslint.config.js`), including hooks linting

### Contribution workflow

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feat/your-feature
   ```
2. Make changes with clear, atomic commits:
   ```bash
   git commit -m "feat: add XYZ"
   ```
3. Run lint and a local build:
   ```bash
   cd Frontend && npm run lint && npm run build
   ```
4. Open a Pull Request with a detailed description and screenshots where relevant.

### Testing

- Suggested setup:
  - Backend: Jest + Supertest for route and utility tests
  - Frontend: Vitest + React Testing Library for component and interaction tests
- Example backend test (conceptual):
  ```bash
  # install dev deps
  npm install -D jest supertest
  # run tests
  npm test
  ```
  > The backend `package.json` has a placeholder `test` script; adopt Jest and Supertest and update scripts accordingly.

### Build & Deployment

- Frontend (Vercel/Netlify):
  ```bash
  npm run build
  npm run preview
  ```
  - Set `VITE_API_BASE` in platform environment pointing to your backend URL
- Backend (Render/Heroku):
  - Start command: `node server.js`
  - Environment: `MONGODB_URI`, `PERPLEXITY_API_KEY`, `JWT_SECRET`, `PORT`
  - Allow your frontend origin in CORS if you restrict origins
- Keep secrets in platform environment settings (never in repo)

---

## License

This project is licensed under the ISC License. See the [ISC license](https://opensource.org/licenses/ISC) for details.

© Ankit Sharma. All rights reserved.

---

## Acknowledgments

- Perplexity API for assistant completions
- React, Vite, Express, Mongoose, and the broader open‑source ecosystem
- `react-markdown`, `rehype-highlight`, and `highlight.js` for rich content rendering
- Font Awesome for icons
- Shields.io for badges

