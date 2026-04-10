# FOSSEE Workshop Booking — UI/UX Enhancement

> **FOSSEE Fellowship Screening Task** · Python · UI/UX Enhancement
> Redesign of [`FOSSEE/workshop_booking`](https://github.com/FOSSEE/workshop_booking) with a focus on performance, modern UI, responsiveness, accessibility, and SEO using React.

---

## Table of Contents

- [Visual Showcase](#visual-showcase)
- [Project Structure](#project-structure)
- [Setup — Django Backend](#setup--django-backend)
- [Setup — React Frontend](#setup--react-frontend)
- [Files Changed](#files-changed)
- [Frontend Architecture](#frontend-architecture)
- [Reasoning](#reasoning)
- [Submission Checklist](#submission-checklist)

---

## Visual Showcase

### Before vs After

| Page | Before | After |
|------|--------|-------|
| **Workshop Types** | Plain table, no search, no card layout | Responsive card grid with live React-powered search filter |
| **Login** | Minimal card with no validation feedback | Inline React form validation, password visibility toggle |
| **Statistics** | Side-by-side layout breaks on mobile | Collapsible mobile filter sidebar, Recharts bar charts |
| **Workshop Status** | Raw tables for accepted/proposed workshops | React tab interface separating Accepted & Proposed |
| **Register** | `form.as_table` dump | Styled two-column grid with password strength indicator |
| **Profile** | Basic table layout | Gradient profile card with clean field rows |

<p align="center">
  <img src="https://github.com/ViggiXDevp/workshop_booking/blob/master/workshop_frontend/workshop_frontend/public/Home.png" width="80%">
</p>
<p align="center">
  <img src="https://github.com/ViggiXDevp/workshop_booking/blob/master/workshop_frontend/workshop_frontend/public/Statistics.png" width="80%">
</p>

---

## Project Structure

```
workshop_booking/                    ← Django project root
├── cms/
├── docs/
├── statistics_app/
│   └── templates/statistics_app/
│       └── workshop_public_stats.html   ← Enhanced
├── teams/
├── workshop_app/
│   ├── static/workshop_app/css/
│   │   └── base.css                     ← Full redesign
│   └── templates/workshop_app/
│       ├── base.html                    ← React CDN + Google Fonts + SEO
│       ├── login.html                   ← React form validation
│       ├── register.html                ← Styled fields + password strength
│       ├── workshop_type_list.html      ← Card grid + live search
│       ├── workshop_type_details.html   ← Clean detail card
│       ├── propose_workshop.html        ← Mobile-friendly form + T&C modal
│       ├── workshop_status_coordinator.html  ← React tabs
│       └── view_profile.html            ← Profile card + edit form
├── workshop_frontend/               ← Standalone React SPA (Vite + Tailwind)
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                  ← React Router v6 routes
│       ├── index.css                ← Tailwind + global styles
│       ├── mockData.js              ← Mirrors Django models exactly
│       ├── components/
│       │   ├── Navbar.jsx           ← Responsive + mobile hamburger
│       │   └── Layout.jsx           ← Shell with navbar + footer
│       └── pages/
│           ├── Home.jsx             ← Dashboard + hero banner
│           ├── Login.jsx            ← Validation + password toggle
│           ├── Register.jsx         ← All fields + password strength
│           ├── WorkshopTypeList.jsx ← Card grid + search + pagination
│           ├── WorkshopTypeDetail.jsx
│           ├── ProposeWorkshop.jsx  ← Date picker + T&C modal
│           ├── MyWorkshops.jsx      ← Accepted/Proposed tabs
│           ├── Statistics.jsx       ← Recharts + filter sidebar + table
│           └── Profile.jsx          ← View + inline edit
├── workshop_portal/
├── manage.py
├── requirements.txt
└── README.md
```

---

## Setup — Django Backend

### Prerequisites

- Python 3.8+
- pip
- MySQL or SQLite database

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/ViggiXDevp/workshop_booking.git
cd workshop_booking

# 2. Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure local settings
cp local_settings.py.example local_settings.py
# Edit local_settings.py — set SECRET_KEY and DATABASE settings

# 5. Run migrations
python manage.py migrate

# 6. Create superuser (optional)
python manage.py createsuperuser

# 7. Collect static files
python manage.py collectstatic

# 8. Start the server
python manage.py runserver
```

Visit `http://127.0.0.1:8000` in your browser.

---

## Setup — React Frontend

The `workshop_frontend/` folder is a standalone React SPA built with Vite + Tailwind CSS. It runs independently for UI development and visual demonstration.

### Prerequisites

- Node.js 18+ ([download](https://nodejs.org/))
- npm 9+

### Steps

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
# Output → workshop_frontend/dist/
```

### Frontend Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Dashboard with hero banner + quick-access cards |
| `/login` | Login | Sign in with client-side validation |
| `/register` | Register | Coordinator registration with all Django fields |
| `/workshop-types` | WorkshopTypeList | Card grid with live search + pagination |
| `/workshop-types/:id` | WorkshopTypeDetail | Workshop details + T&C |
| `/propose` | ProposeWorkshop | Proposal form with date picker + T&C modal |
| `/my-workshops` | MyWorkshops | Accepted & Proposed tab view |
| `/statistics` | Statistics | Recharts charts + filter sidebar + data table |
| `/profile` | Profile | View + edit user profile |

### Frontend Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React 18](https://react.dev/) | UI framework |
| [React Router v6](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first styling |
| [Recharts](https://recharts.org/) | Bar charts for statistics |
| [Lucide React](https://lucide.dev/) | Icon set |

### Mock Data (`src/mockData.js`)

All data mirrors the Django models exactly:

- `workshopTypes` → `WorkshopType` model (name, duration, description, T&C)
- `workshops` → `Workshop` model (coordinator, instructor, date, status 0/1/2)
- `currentUser` → logged-in `User` + `Profile`
- `stateChoices` → all 36 Indian states from Django `states` tuple
- `departmentChoices` → matches Django `department_choices`
- `getStatsByState()` / `getStatsByType()` → mirrors Django `WorkshopManager` aggregation

To connect to the live Django backend, replace `mockData.js` imports with `fetch()` calls to your API endpoints and add a dev proxy in `vite.config.js`:

```js
server: { proxy: { "/api": "http://localhost:8000" } }
```

---

## Files Changed

### Django Templates & Static Files

| File | What Changed |
|------|-------------|
| `workshop_app/static/workshop_app/css/base.css` | Complete redesign — CSS custom properties (design tokens), mobile-first grid, modern card/button/form/badge/table styles, fluid typography with `clamp()`, animations |
| `workshop_app/templates/workshop_app/base.html` | React 18 via CDN, Google Fonts (Plus Jakarta Sans), SEO `<meta>` + Open Graph tags, accessible navbar with Login/Register for unauthenticated users, improved footer |
| `workshop_app/templates/workshop_app/login.html` | React form with client-side validation, password show/hide toggle, `aria-invalid` / `aria-describedby`, `<noscript>` fallback |
| `workshop_app/templates/workshop_app/register.html` | Replaced `form.as_table` with styled two-column grid of individual fields; React password strength bar |
| `workshop_app/templates/workshop_app/workshop_type_list.html` | Django data-island JSON → React card grid with live search filter; accessible pagination |
| `workshop_app/templates/workshop_app/workshop_type_details.html` | Definition-list card, back navigation, contextual CTA |
| `workshop_app/templates/workshop_app/propose_workshop.html` | Single-column mobile-friendly form, styled T&C modal, clear error messages |
| `workshop_app/templates/workshop_app/workshop_status_coordinator.html` | React tab interface for Accepted / Proposed; welcome banner for empty state |
| `workshop_app/templates/workshop_app/view_profile.html` | Profile card with gradient header; clean field rows; two-column edit grid |
| `statistics_app/templates/statistics_app/workshop_public_stats.html` | Responsive two-column layout; collapsible mobile filter sidebar (`aria-expanded`); updated chart colours |

### React Frontend (new folder)

| File | Description |
|------|-------------|
| `workshop_frontend/src/App.jsx` | Central router — all page routes defined here |
| `workshop_frontend/src/mockData.js` | Hardcoded data mirroring all Django models |
| `workshop_frontend/src/components/Navbar.jsx` | Responsive navbar with mobile hamburger drawer |
| `workshop_frontend/src/components/Layout.jsx` | Page shell wrapping navbar + footer |
| `workshop_frontend/src/pages/Home.jsx` | Hero banner + quick-access cards + recent workshops |
| `workshop_frontend/src/pages/Login.jsx` | Validation + password toggle |
| `workshop_frontend/src/pages/Register.jsx` | All Django fields + password strength indicator |
| `workshop_frontend/src/pages/WorkshopTypeList.jsx` | Card grid + live search + pagination |
| `workshop_frontend/src/pages/WorkshopTypeDetail.jsx` | Detail card + T&C display |
| `workshop_frontend/src/pages/ProposeWorkshop.jsx` | Date picker + T&C modal + success state |
| `workshop_frontend/src/pages/MyWorkshops.jsx` | Accepted / Proposed React tabs |
| `workshop_frontend/src/pages/Statistics.jsx` | Recharts bar charts + filter sidebar + paginated table |
| `workshop_frontend/src/pages/Profile.jsx` | View + inline edit with all Django profile fields |

---

## Reasoning

### What design principles guided your improvements?

**Visual hierarchy first.** Every page was audited for the most important action a user needs to take, and that element was made visually dominant — the "Submit Proposal" button on the proposal page, workshop cards on the list page. Supporting information uses smaller, muted text so the eye flows naturally to what matters.

**Mobile-first, not mobile-afterthought.** Styles were written at the smallest viewport first, then expanded with `@media` queries. CSS Grid with `auto-fill` / `minmax` and Tailwind breakpoints (`sm:`, `lg:`) let content reflow naturally without explicit breakpoints for every screen size.

**Consistency through design tokens.** A single set of CSS custom properties (`--primary`, `--radius`, `--shadow`, etc.) is declared once in `base.css` and reused everywhere. In the React frontend, Tailwind's config extends the same colour palette. Future theme changes require editing one place.

**Accessibility (WCAG 2.1 AA target).** Every interactive element has a visible focus ring. Form errors are linked via `aria-describedby` and `aria-invalid`. Icon-only buttons carry `aria-label`. Tables have `aria-label`. Tab interfaces use `role="tablist"` and `aria-selected`. Colour contrast was checked for all pairings.

**Progressive enhancement.** React components in the Django templates mount on top of server-rendered output. The login form includes a `<noscript>` fallback. Core content is always visible even without JavaScript.

---

### How did you ensure responsiveness across devices?

1. **CSS Grid `auto-fill` / `minmax`** — the workshop card grid adapts from one column on a 320 px phone to four columns on desktop without a single explicit breakpoint.
2. **Tailwind responsive prefixes** — `sm:grid-cols-2 lg:grid-cols-3` handle layout transitions declaratively in the React frontend.
3. **`clamp()` for fluid typography** — headings scale smoothly between viewports instead of jumping at breakpoints.
4. **Fixed navbar height as CSS variable** — `--nav-height: 60px` is reused for `padding-top` and `sticky` offsets, so layout adjusts from one place.
5. **Collapsible filter sidebar** — the statistics page hides its filter panel behind a toggle button below 992 px, with `aria-expanded` kept in sync for screen readers.
6. **Horizontal scroll on tables** — all tables sit inside `overflow-x: auto` wrappers so they never break the page layout on narrow screens.
7. **`rem`-based spacing** — all padding and margin use `rem` units, respecting the user's browser font-size preference.

---

### What trade-offs did you make between design and performance?

| Decision | Trade-off |
|----------|-----------|
| React 18 via CDN (Django templates) | Adds ~130 KB (gzipped ~42 KB) to first load. Accepted because it enables reactive components without a build pipeline, keeping Django workflow intact. `production.min.js` variant used to minimise size. |
| Vite + React SPA (frontend folder) | Separate dev server needed. Accepted because it gives full component isolation, HMR, and Tailwind JIT — making UI iteration much faster. |
| Google Fonts (Plus Jakarta Sans) | ~20 KB extra network request. Mitigated with `<link rel="preconnect">` and `display=swap`. Significantly improves readability over system fonts. |
| CSS custom properties only, no Sass | No build step for Django templates. Minor downside: no IE 11 support, which is acceptable for FOSSEE's student audience. |
| Django→React data-island pattern | Avoids extra AJAX calls. Data already in Django view context is serialised into `<script type="application/json">` tags — zero extra latency. |
| Recharts over D3 | Heavier bundle but provides responsive charts out of the box with a familiar React API, reducing implementation time significantly. |
| Mock data in frontend folder | Enables rapid UI prototyping without a running Django server. Trade-off is that data is static until real API endpoints are wired up. |

---

### What was the most challenging part and how did you approach it?

**Bridging Django's server-rendered templates with React's client-side reactivity — without a build step.**

Django renders on the server; React lives in the browser. The standard approach (CRA or Vite) requires a separate build pipeline that would change how the project is deployed.

**Solution — data-island pattern:**
1. Django renders a `<script type="application/json">` tag with serialised context data.
2. A small inline React script reads that JSON, builds the UI, and mounts it on a `<div>`.
3. Django templates retain server-rendered fallbacks so pages are never blank without JavaScript.

This gave full React interactivity (live search, tabs, form validation) with zero build tooling and zero changes to any Django view or URL.

A secondary challenge was ensuring the CSS redesign didn't break existing Bootstrap classes emitted by Django form widgets. The solution was to **extend, not replace** Bootstrap — `base.css` overrides specific selectors (`.card`, `.btn`, `.table`, `.badge`) with new design tokens, so Django widgets automatically pick up the new styles without template changes.

For the standalone React frontend, the challenge was mirroring the Django data model precisely in `mockData.js` — including the `states` tuple, `STATUS_CHOICES`, and the `WorkshopManager` aggregation logic — so the UI behaves identically to what the real backend would return.

---

## Submission Checklist

- [x] Code is readable and well-structured
- [x] Git history shows progressive work (no single-commit dumps)
- [x] README includes reasoning answers and setup instructions for both Django and React
- [x] Screenshots section included *(add actual screenshots before submission)*
- [x] Code is documented with inline comments where necessary
- [x] React frontend runs independently with `npm install && npm run dev`
- [x] Django templates enhanced with mobile-first CSS and React interactivity
