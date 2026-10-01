"use client";

import { useEffect, useMemo, useState } from "react";
import { FacetedFilter } from "@/components/commerce/FacetedFilter";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductCardSkeleton } from "@/components/commerce/ProductCardSkeleton";
import { getAvailableCategories, getPriceBounds, getProducts } from "@/services/pimApiClient";
import type { Product, ProductFilters } from "@/types/product";

const categories = getAvailableCategories();
const priceBounds = getPriceBounds();
const SKELETON_COUNT = 8;

export default function CatalogView() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function updateFilters(next: ProductFilters | ((prev: ProductFilters) => ProductFilters)) {
    setIsLoading(true);
    setFilters(next);
  }

  useEffect(() => {
    let cancelled = false;

    getProducts(filters).then((result) => {
      if (!cancelled) {
        setProducts(result);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [filters]);

  const resultsLabel = useMemo(() => {
    if (isLoading) return "Searching catalog…";
    return `${products.length} product${products.length === 1 ? "" : "s"} found`;
  }, [isLoading, products.length]);

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Product Catalog</h1>
        <p className="text-sm text-foreground-muted">
          Faceted browsing across the mock PIM-backed product catalog.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
          </svg>
          <input
            type="search"
            placeholder="Search by name, SKU, or attribute…"
            value={filters.query ?? ""}
            onChange={(e) => updateFilters((prev) => ({ ...prev, query: e.target.value || undefined }))}
            className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-foreground-muted transition-colors focus:border-accent focus:outline-none"
          />
        </div>
        <span className="text-xs tabular-nums text-foreground-muted">{resultsLabel}</span>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <FacetedFilter
          categories={categories}
          priceBounds={priceBounds}
          filters={filters}
          onChange={updateFilters}
        />

        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border-strong p-12 text-center text-sm text-foreground-muted">
              No products match the current filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
