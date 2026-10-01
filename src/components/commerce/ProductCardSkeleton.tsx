export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <div className="aspect-[4/3] w-full border-b border-border bg-surface-muted" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-3 w-16 rounded bg-surface-muted" />
        <div className="h-4 w-full rounded bg-surface-muted" />
        <div className="h-4 w-2/3 rounded bg-surface-muted" />
        <div className="h-5 w-20 rounded-full bg-surface-muted" />
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="h-5 w-14 rounded bg-surface-muted" />
          <div className="h-7 w-24 rounded-md bg-surface-muted" />
        </div>
      </div>
    </div>
  );
}
