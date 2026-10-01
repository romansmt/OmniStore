"use client";

import Image from "next/image";
import type { Product } from "@/types/product";
import { Badge, type BadgeVariant } from "@/components/common/Badge";
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
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge variant="neutral" className="absolute left-3 top-3 bg-surface/90 backdrop-blur">
          {product.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-mono text-xs text-foreground-muted">{product.sku}</p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
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
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:opacity-90"
          >
            {isOrderable ? "Add to Cart" : "Request Quote"}
          </button>
        </div>
      </div>
    </div>
  );
}
