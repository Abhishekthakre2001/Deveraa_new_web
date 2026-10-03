"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60svh] flex-col items-center justify-center px-4 py-20 text-center">
      <AlertCircle aria-hidden="true" className="mb-5 h-10 w-10 text-blue-600 dark:text-cyan-400" />
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        We couldn&apos;t load this page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-7 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-400 dark:text-slate-950 dark:hover:bg-blue-300"
      >
        Try again
      </button>
    </main>
  );
}
