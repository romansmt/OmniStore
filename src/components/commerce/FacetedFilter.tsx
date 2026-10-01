"use client";

import type { Product, ProductFilters, StockStatus } from "@/types/product";

const STOCK_OPTIONS: StockStatus[] = ["In Stock", "Low Stock", "Out of Stock"];

interface FacetedFilterProps {
  categories: Product["category"][];
  priceBounds: { min: number; max: number };
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
}

export function FacetedFilter({ categories, priceBounds, filters, onChange }: FacetedFilterProps) {
  const selectedCategories = filters.categories ?? [];

  function toggleCategory(category: Product["category"]) {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onChange({ ...filters, categories: next.length > 0 ? next : undefined });
  }

  function setStockStatus(status: StockStatus | undefined) {
    onChange({ ...filters, stockStatus: status });
  }

  function setMaxPrice(value: number) {
    onChange({ ...filters, maxPrice: value });
  }

  function reset() {
    onChange({ query: filters.query });
  }

  const hasActiveFacets =
    selectedCategories.length > 0 ||
    Boolean(filters.stockStatus) ||
    (filters.maxPrice !== undefined && filters.maxPrice < priceBounds.max);

  return (
    <aside className="flex w-full flex-col gap-6 rounded-lg border border-border bg-surface p-5 lg:w-64">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
          Filters
        </h2>
        {hasActiveFacets && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-medium text-accent hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
          Category
        </legend>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label key={category} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="h-4 w-4 rounded border-border-strong accent-[var(--accent)]"
              />
              {category}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
          Stock Status
        </legend>
        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="radio"
              name="stockStatus"
              checked={!filters.stockStatus}
              onChange={() => setStockStatus(undefined)}
              className="h-4 w-4 border-border-strong accent-[var(--accent)]"
            />
            Any
          </label>
          {STOCK_OPTIONS.map((status) => (
            <label key={status} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="radio"
                name="stockStatus"
                checked={filters.stockStatus === status}
                onChange={() => setStockStatus(status)}
                className="h-4 w-4 border-border-strong accent-[var(--accent)]"
              />
              {status}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
          Max Price
        </legend>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={1}
          value={filters.maxPrice ?? priceBounds.max}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <div className="mt-1 flex justify-between text-xs tabular-nums text-foreground-muted">
          <span>${priceBounds.min.toFixed(0)}</span>
          <span>${(filters.maxPrice ?? priceBounds.max).toFixed(0)}</span>
        </div>
      </fieldset>
    </aside>
  );
}
