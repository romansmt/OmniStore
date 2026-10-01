import Link from "next/link";

const METRICS = [
  { label: "Catalog SKUs", value: "10" },
  { label: "Faceted Filters", value: "3" },
  { label: "Avg. API Latency (mock)", value: "220ms" },
  { label: "Lighthouse Target", value: "90+" },
];

const FEATURES = [
  {
    title: "Decoupled Architecture",
    description:
      "Presentation layer is fully separated from the product data domain, mirroring a headless commerce frontend consuming a PIM/commerce API.",
  },
  {
    title: "Enterprise PIM Integration",
    description:
      "A typed product service layer simulates a Pimcore/Spryker-style catalog API, including faceted filtering and keyword search.",
  },
  {
    title: "Real-Time Faceted Search",
    description:
      "Category, stock status, and price filters update the catalog view instantly via client-side state, no full page reloads.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Headless B2B Commerce &amp; Content Hub
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Enterprise procurement, built on decoupled architecture.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-muted">
            OmniStore demonstrates MACH-aligned frontend engineering — Microservices,
            API-first, Cloud-native, Headless — applied to a real B2B catalog and
            quote-request workflow.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/catalog"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Browse Catalog
            </Link>
            <Link
              href="/architecture"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
            >
              View Architecture
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border px-6 py-px sm:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.label} className="bg-background px-4 py-6">
              <p className="text-2xl font-semibold tabular-nums text-foreground">{metric.value}</p>
              <p className="mt-1 text-xs text-foreground-muted">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-xl font-semibold tracking-tight text-foreground">
          Platform Capabilities
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-border bg-surface p-5">
              <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
