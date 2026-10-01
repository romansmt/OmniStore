const STACK = [
  "Next.js 16 (App Router)",
  "TypeScript (strict mode)",
  "Tailwind CSS v4",
  "Zustand (state management)",
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-14">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">About</p>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        OmniStore — Headless B2B PIM &amp; Commerce Portal
      </h1>
      <p className="mt-5 text-sm leading-relaxed text-foreground-muted">
        OmniStore is a portfolio project demonstrating enterprise-grade frontend
        architecture patterns for B2B digital commerce: a decoupled, MACH-aligned
        catalog experience backed by a simulated Product Information Management
        (PIM) service layer, faceted search, and a persistent quote-request cart.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
        It is intentionally scoped as a frontend-only demonstration — the service
        layer in <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs">src/services</code>{" "}
        is built so it can be swapped for a real PIM/commerce API (e.g. Pimcore,
        Spryker) without changes to the component layer.
      </p>

      <h2 className="mt-10 mb-3 text-sm font-semibold uppercase tracking-wide text-foreground-muted">
        Tech Stack
      </h2>
      <ul className="flex flex-col gap-2">
        {STACK.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
