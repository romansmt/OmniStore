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
  const hasPriceFilter = filters.maxPrice !== undefined && filters.maxPrice < priceBounds.max;

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

  function clearMaxPrice() {
    onChange({ ...filters, maxPrice: undefined });
  }

  function reset() {
    onChange({ query: filters.query });
  }

  const activeChips: { key: string; label: string; onRemove: () => void }[] = [
    ...selectedCategories.map((category) => ({
      key: `cat-${category}`,
      label: category,
      onRemove: () => toggleCategory(category),
    })),
    ...(filters.stockStatus
      ? [{ key: "stock", label: filters.stockStatus, onRemove: () => setStockStatus(undefined) }]
      : []),
    ...(hasPriceFilter
      ? [{ key: "price", label: `≤ $${filters.maxPrice!.toFixed(0)}`, onRemove: clearMaxPrice }]
      : []),
  ];

  return (
    <aside className="flex w-full flex-col gap-6 self-start rounded-lg border border-border bg-surface p-5 lg:sticky lg:top-24 lg:w-64">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
          Filters
        </h2>
        {activeChips.length > 0 && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-medium text-accent hover:underline"
          >
            Reset all
          </button>
        )}
      </div>

      {activeChips.length > 0 && (
        <div className="-mt-2 flex flex-wrap gap-1.5">
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={chip.onRemove}
              className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 py-1 pl-2.5 pr-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
            >
              {chip.label}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
        </div>
      )}

      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
          Category
        </legend>
        <div className="flex flex-col gap-0.5">
          {categories.map((category) => {
            const isChecked = selectedCategories.includes(category);
            return (
              <label
                key={category}
                className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                  isChecked ? "bg-accent/10 text-foreground" : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategory(category)}
                  className="h-4 w-4 rounded border-border-strong accent-[var(--accent)]"
                />
                {category}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
          Stock Status
        </legend>
        <div className="flex flex-col gap-0.5">
          <label
            className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
              !filters.stockStatus ? "bg-accent/10 text-foreground" : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
            }`}
          >
            <input
              type="radio"
              name="stockStatus"
              checked={!filters.stockStatus}
              onChange={() => setStockStatus(undefined)}
              className="h-4 w-4 border-border-strong accent-[var(--accent)]"
            />
            Any
          </label>
          {STOCK_OPTIONS.map((status) => {
            const isChecked = filters.stockStatus === status;
            return (
              <label
                key={status}
                className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                  isChecked ? "bg-accent/10 text-foreground" : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="stockStatus"
                  checked={isChecked}
                  onChange={() => setStockStatus(status)}
                  className="h-4 w-4 border-border-strong accent-[var(--accent)]"
                />
                {status}
              </label>
            );
          })}
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
          className="w-full"
        />
        <div className="mt-2 flex justify-between text-xs tabular-nums text-foreground-muted">
          <span>${priceBounds.min.toFixed(0)}</span>
          <span className="font-medium text-foreground">
            ${(filters.maxPrice ?? priceBounds.max).toFixed(0)}
          </span>
        </div>
      </fieldset>
    </aside>
  );
}
