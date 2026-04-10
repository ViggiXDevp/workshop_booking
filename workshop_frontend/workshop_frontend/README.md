# workshop_frontend

> React + Vite + Tailwind CSS frontend for the FOSSEE Workshop Booking system.
> Mirrors all pages from the Django backend with full UI/UX redesign.

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React 18](https://react.dev/) | UI framework |
| [React Router v6](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first styling |
| [Recharts](https://recharts.org/) | Bar charts for statistics |
| [Lucide React](https://lucide.dev/) | Icon set |

## Project Structure

```
workshop_frontend/
├── index.html                  # Vite entry HTML
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Router + route definitions
    ├── index.css               # Tailwind directives + global styles
    ├── mockData.js             # Mirrors Django models (WorkshopType, Workshop, Profile)
    ├── components/
    │   ├── Navbar.jsx          # Responsive top navbar (mobile hamburger)
    │   └── Layout.jsx          # Page shell with navbar + footer
    └── pages/
        ├── Home.jsx            # Dashboard with hero banner + quick-access cards
        ├── Login.jsx           # Login with validation + password toggle
        ├── Register.jsx        # Registration with password strength indicator
        ├── WorkshopTypeList.jsx # Card grid with live search + pagination
        ├── WorkshopTypeDetail.jsx # Workshop type detail + T&C
        ├── ProposeWorkshop.jsx # Propose form with date picker + T&C modal
        ├── MyWorkshops.jsx     # Accepted / Proposed tabs (coordinator view)
        ├── Statistics.jsx      # Filter sidebar + recharts + data table
        └── Profile.jsx         # View + edit profile
```

## Getting Started

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org/))
- npm 9+

### Install & Run

```bash
# From the repo root
cd workshop_frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
# Output → dist/
```

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Dashboard with recent workshops |
| `/login` | Login | Sign in with validation |
| `/register` | Register | Coordinator registration |
| `/workshop-types` | WorkshopTypeList | Browse & search workshops |
| `/workshop-types/:id` | WorkshopTypeDetail | Workshop details & T&C |
| `/propose` | ProposeWorkshop | Submit a workshop proposal |
| `/my-workshops` | MyWorkshops | Accepted & proposed tab view |
| `/statistics` | Statistics | Charts, filters & data table |
| `/profile` | Profile | View & edit user profile |

## Mock Data (`src/mockData.js`)

All data is hardcoded to mirror the Django models exactly:

- **`workshopTypes`** — `WorkshopType` model (name, duration, description, T&C)
- **`workshops`** — `Workshop` model (coordinator, instructor, date, status 0/1)
- **`currentUser`** — logged-in `User` + `Profile` (coordinator role)
- **`stateChoices`** — all 36 Indian states from the Django `states` tuple
- **`departmentChoices`** — matches Django `department_choices`
- Helper functions `getStatsByState()` and `getStatsByType()` replicate the Django `WorkshopManager` aggregation logic

When integrating with the live Django backend, replace `mockData.js` imports with `fetch()` / `axios` calls to the corresponding API endpoints.

## How It Integrates with the Django Backend

This folder is a **standalone React SPA** that sits alongside the Django project. Integration paths:

1. **Static file serving** — run `npm run build`, then serve `dist/` from Django's `staticfiles` or a CDN.
2. **API-driven** — replace `mockData.js` with real `fetch` calls to Django REST endpoints (e.g., `/api/workshop-types/`, `/api/workshops/`).
3. **Dev proxy** — add to `vite.config.js`:
   ```js
   server: { proxy: { "/api": "http://localhost:8000" } }
   ```

## Design Decisions

- **Mobile-first** — every layout starts at 1 column and expands with Tailwind breakpoints (`sm:`, `lg:`).
- **Component isolation** — each page is self-contained; shared UI (Navbar, Layout) lives in `components/`.
- **No global state library** — `useState` + `useMemo` are sufficient for the current scope; add Zustand/Redux if scope grows.
- **Accessible** — focus rings, `aria-label`, `aria-selected`, `role="tablist"`, `aria-expanded` on all interactive elements.
