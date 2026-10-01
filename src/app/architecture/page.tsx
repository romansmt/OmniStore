import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture — OmniStore",
  description: "How OmniStore applies MACH principles across its frontend layers.",
};

const PRINCIPLES = [
  {
    title: "Microservices",
    detail:
      "The product domain is isolated behind a typed service client (pimApiClient.ts), so the mock layer can be swapped for a real PIM/commerce microservice without touching UI components.",
  },
  {
    title: "API-first",
    detail:
      "All product data flows through getProducts()/getProductById() contracts defined by shared TypeScript interfaces in src/types, keeping the frontend contract-driven rather than markup-driven.",
  },
  {
    title: "Cloud-native",
    detail:
      "Built on Next.js App Router for edge/server rendering, with stateless UI components and client state isolated to Zustand — ready for containerized, horizontally-scaled deployment.",
  },
  {
    title: "Headless",
    detail:
      "Presentation (src/app, src/components) is fully decoupled from the data layer (src/services). Any storefront or channel could consume the same service contracts.",
  },
];

const LAYERS = [
  { layer: "Presentation", detail: "src/app, src/components — App Router pages and UI" },
  { layer: "State", detail: "src/store — Zustand store for cart/quote-request workflow, persisted to localStorage" },
  { layer: "Domain Types", detail: "src/types — Strict TypeScript contracts for Product, filters, and cart items" },
  { layer: "Service Layer", detail: "src/services — Simulated PIM/commerce API client with faceted filtering" },
];

export default function ArchitecturePage() {
  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-6 py-14">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        MACH Architecture
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        How OmniStore is structured
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-muted">
        OmniStore is architected to mirror the separation of concerns expected in a
        production headless commerce platform, even though the data layer here is mocked.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {PRINCIPLES.map((principle) => (
          <div key={principle.title} className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold text-foreground">{principle.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{principle.detail}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 mb-4 text-sm font-semibold uppercase tracking-wide text-foreground-muted">
        Layer Breakdown
      </h2>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <tbody>
            {LAYERS.map((row, i) => (
              <tr key={row.layer} className={i !== 0 ? "border-t border-border" : ""}>
                <td className="w-40 px-4 py-3 font-medium text-foreground">{row.layer}</td>
                <td className="px-4 py-3 text-foreground-muted">{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
