"use client";

import { useEffect, useMemo, useState } from "react";
import { FacetedFilter } from "@/components/commerce/FacetedFilter";
import { ProductCard } from "@/components/commerce/ProductCard";
import { getAvailableCategories, getPriceBounds, getProducts } from "@/services/pimApiClient";
import type { Product, ProductFilters } from "@/types/product";

const categories = getAvailableCategories();
const priceBounds = getPriceBounds();

export default function CatalogPage() {
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
    <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Product Catalog</h1>
        <p className="text-sm text-foreground-muted">
          Faceted browsing across the mock PIM-backed product catalog.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <input
          type="search"
          placeholder="Search by name, SKU, or attribute…"
          value={filters.query ?? ""}
          onChange={(e) => updateFilters((prev) => ({ ...prev, query: e.target.value || undefined }))}
          className="w-full max-w-sm rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
        />
        <span className="text-xs text-foreground-muted">{resultsLabel}</span>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <FacetedFilter
          categories={categories}
          priceBounds={priceBounds}
          filters={filters}
          onChange={updateFilters}
        />

        <div className="flex-1">
          {!isLoading && products.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border-strong p-12 text-center text-sm text-foreground-muted">
              No products match the current filters.
            </div>
          ) : (
            <div
              aria-busy={isLoading}
              className={`grid grid-cols-2 gap-4 transition-opacity sm:grid-cols-3 xl:grid-cols-4 ${isLoading ? "opacity-50" : "opacity-100"}`}
            >
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
