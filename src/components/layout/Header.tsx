"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore, selectItemCount } from "@/store/useCartStore";
import { Badge } from "@/components/common/Badge";

const NAV_LINKS = [
  { href: "/catalog", label: "Catalog" },
  { href: "/architecture", label: "Architecture" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const itemCount = useCartStore(selectItemCount);
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-baseline gap-1 font-semibold tracking-tight">
            <span className="text-lg">OmniStore</span>
            <span className="text-xs text-foreground-muted">™</span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-surface-muted text-foreground"
                      : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="success" className="hidden md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            MACH-Architecture Active
          </Badge>

          <button
            type="button"
            onClick={toggleDrawer}
            className="relative inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-muted"
            aria-label="Open cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.436M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.78-4.799 1.907-7.383a1.125 1.125 0 0 0-1.12-1.183H5.436m2.064 8.566L5.436 5.084M7.5 14.25 5.436 5.084M9.75 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
