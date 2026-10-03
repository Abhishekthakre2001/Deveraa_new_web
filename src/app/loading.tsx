export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="flex min-h-[60svh] flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-600 motion-reduce:animate-none"
      />
      <p className="text-sm font-medium text-muted-foreground">Loading page…</p>
    </main>
  );
}
