```
 ██╗   ██╗██╗██╗  ██╗ █████╗ ███████╗
 ██║   ██║██║██║ ██╔╝██╔══██╗██╔════╝
 ██║   ██║██║█████╔╝ ███████║███████╗
 ╚██╗ ██╔╝██║██╔═██╗ ██╔══██║╚════██║
  ╚████╔╝ ██║██║  ██╗██║  ██║███████║
   ╚═══╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
   P O R T F O L I O   ·   C M S
```

# Vikas Vitekari — Cyberpunk Developer Portfolio

> A premium, futuristic portfolio with a built-in **Command Center CMS**.  
> Dark magenta neon aesthetic · React + Vite · Node/Express · MongoDB · Cloudinary.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Node](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-FF0755?style=for-the-badge)](./LICENSE)

---

## ✨ Highlights

- **Cyberpunk UI** — deep black `#050307` base, neon magenta `#FF0755` accents, technical grids, geometric V backdrop, scan lines, particles.
- **Fully CMS-driven** — every section (Hero, About, Tech, Projects, Footer, Profile, SEO, Nav) is editable from a secured admin panel. No hardcoded content.
- **Interactive terminal** in About with clickable commands and typewriter output.
- **Admin "Command Center"** — sticky sidebar, dashboard, analytics charts, content editors, project CRUD, image uploads.
- **Live preview** in admin — sidebar + editor + live site preview in one view, auto-refreshes on save.
- **Metrics** — site views, likes, analytics (charts + tables).
- **Responsive** — desktop / tablet / mobile.

---

## 🧱 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite 8, Tailwind CSS 3, React Router 7 |
| Backend | Node.js, Express 5, Mongoose 9 |
| Database | MongoDB Atlas |
| Media | Cloudinary (image uploads) |
| Auth | JWT (admin) |
| Fonts | Orbitron, Sarpanch, Signika, Oxygen |

---

## 📁 Project Structure

```
portfolio/
├── server/                # Express API (content, auth, profile, projects, tech, metrics)
│   ├── index.js
│   ├── content.js
│   ├── migrate.js / seed.js
│   ├── models/            # Mongoose schemas (incl. SiteSettings)
│   └── routes/
├── shared/                # contentDefaults.js (single source of truth)
├── src/
│   ├── components/
│   │   ├── portfolio/     # Home (hero), Navbar, About, Projects, Footer, ...
│   │   ├── admin/         # Command Center editors
│   │   └── shared/
│   ├── context/           # Content, Theme, Metrics, Auth
│   ├── designs/           # project-1 layout
│   └── index.css          # all styling
├── public/
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone & install
```bash
git clone https://github.com/SilentWatcher/portfolio.git
cd portfolio
npm install
```

### 2. Environment variables
Create `server/.env` (or root `.env`) with:
```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-key
PORT=5000
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 3. Run (dev)
```bash
npm run dev:all     # Vite (5173) + API (5000) concurrently
```

### 4. Build (prod)
```bash
npm run build       # outputs to /dist
npm start           # serves dist + API
```

### 5. Seed / migrate (optional)
```bash
npm run migrate     # apply schema migrations
npm run seed        # seed initial content
```

---

## 🔐 Admin Panel

- URL: `/admin/login`
- Default credentials (change after first login):
  - Email: `admin@portfolio.com`
  - Password: `admin123`
- From the Command Center you can edit Hero, About, Tech, Projects, Footer, Profile, Site Settings, and view Analytics.

---

## 🎨 Design Language

| Token | Value |
|---|---|
| Background | `#050307` |
| Accent (neon magenta) | `#FF0755` |
| Secondary glow | `#ff2f6f` |
| Grid | 64px technical grid, magenta-tinted |
| Typography | Orbitron (display) · Sarpanch (UI) · Signika/Oxygen (body) |

---

## 🧪 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run dev:server` | Express API |
| `npm run dev:all` | Both concurrently |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm start` | Serve production |
| `npm run seed` | Seed DB |
| `npm run migrate` | Run migrations |

---

## 📸 Screenshots

> _Add screenshots of the hero, about, projects, and admin panel here._

---



