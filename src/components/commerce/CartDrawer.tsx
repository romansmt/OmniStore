"use client";

import { useState } from "react";
import { useCartStore, selectSubtotal } from "@/store/useCartStore";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore(selectSubtotal);

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      setSubmitted(false);
      closeDrawer();
    }, 1800);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close cart overlay"
        onClick={closeDrawer}
        className="animate-overlay-in absolute inset-0 bg-black/40 backdrop-blur-[1px] cursor-default"
      />

      <aside className="animate-drawer-in relative flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold tracking-wide text-foreground-muted uppercase">
            Enterprise Quote Cart
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="rounded-md p-1.5 text-foreground-muted hover:bg-surface-muted hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="mt-12 flex flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-foreground-muted">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.436M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.78-4.799 1.907-7.383a1.125 1.125 0 0 0-1.12-1.183H5.436m2.064 8.566L5.436 5.084M7.5 14.25 5.436 5.084M9.75 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              <p className="max-w-[22ch] text-sm text-foreground-muted">
                No items selected yet. Add products from the catalog to build a quote request.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.productId} className="flex items-start justify-between gap-3 border-b border-border pb-4 last:border-b-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-foreground-muted">{item.sku}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="h-6 w-6 rounded border border-border text-sm text-foreground-muted transition-colors hover:border-border-strong hover:bg-surface-muted hover:text-foreground"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm tabular-nums">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="h-6 w-6 rounded border border-border text-sm text-foreground-muted transition-colors hover:border-border-strong hover:bg-surface-muted hover:text-foreground"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="ml-2 text-xs text-danger hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium tabular-nums text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-5 py-4">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-foreground-muted">Subtotal</span>
            <span className="font-semibold tabular-nums text-foreground">{formatPrice(subtotal)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0 || submitted}
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-all disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:opacity-90 enabled:active:scale-[0.98]"
          >
            {submitted ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Inquiry Submitted
              </>
            ) : (
              "Submit Enterprise Inquiry / Checkout"
            )}
          </button>
        </div>
      </aside>
    </div>
  );
}
