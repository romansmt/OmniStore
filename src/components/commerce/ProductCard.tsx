"use client";

import type { Product } from "@/types/product";
import { Badge, type BadgeVariant } from "@/components/common/Badge";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { useCartStore } from "@/store/useCartStore";

const STOCK_VARIANT: Record<Product["stockStatus"], BadgeVariant> = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
};

function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const isOrderable = product.stockStatus !== "Out of Stock";

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-xl hover:shadow-black/20">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border-b border-border bg-[linear-gradient(155deg,var(--surface-muted),var(--surface))]">
        <div
          className="absolute inset-0 opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
          aria-hidden
        />
        <CategoryIcon
          category={product.category}
          className="relative h-12 w-12 text-foreground-muted/70 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent"
        />
        <Badge variant="neutral" className="absolute left-3 top-3 border-border bg-surface/90 backdrop-blur">
          {product.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-mono text-xs text-foreground-muted">{product.sku}</p>
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-foreground">
          {product.name}
        </h3>

        <Badge variant={STOCK_VARIANT[product.stockStatus]} className="w-fit">
          {product.stockStatus}
        </Badge>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base font-semibold tabular-nums text-foreground">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            disabled={!isOrderable}
            onClick={() => addItem(product)}
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-all duration-150 enabled:hover:opacity-90 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isOrderable ? "Add to Cart" : "Request Quote"}
          </button>
        </div>
      </div>
    </div>
  );
}
