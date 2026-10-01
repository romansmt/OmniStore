# OmniStore - Headless B2B PIM & Commerce Portal

OmniStore is a demonstration of enterprise-grade frontend architecture, built to
mirror the technical requirements of modern digital platforms.

## 🏛 Architectural Highlights

- **Decoupled MACH Principles:** Clear separation of presentation layer from
  product information management (PIM) mock services.
- **State & Data Flow:** Predictable client-side state management with Zustand and
  persistent storage handlers.
- **Performance & Usability:** High-information-density UI built with Tailwind CSS,
  optimized for B2B enterprise users.

See [`/architecture`](http://localhost:3000/architecture) once running for a full
breakdown of the layer structure.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
  app/                 App Router pages (/, /catalog, /architecture, /about)
  components/
    common/            Shared presentational primitives (Badge)
    layout/             Header
    commerce/           FacetedFilter, ProductCard, CartDrawer
  services/            Mock PIM API client (src/services/pimApiClient.ts)
  store/               Zustand cart/quote-request store
  types/               Shared domain types (Product, ProductFilters)
```

## Tech Stack

Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Zustand

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start the dev server       |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
| `npm run lint`  | Run ESLint                 |

## Deployment

Deploy to [Vercel](https://vercel.com/new) or [Netlify](https://www.netlify.com/)
with a single click. Run a Lighthouse audit after deploying to verify a 90+ score
across Performance, Accessibility, and Best Practices.
