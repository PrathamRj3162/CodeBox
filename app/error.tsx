"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled client error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 border-4 border-black rounded-2xl bg-zinc-900 shadow-[8px_8px_0_0_#000]">
        <h1 className="font-game text-4xl text-yellow-400 mb-2">Glitched Out!</h1>
        <p className="font-game text-xl text-gray-300 mb-6">
          A client glitch was intercepted. Your progress is saved safely.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
            variant="pixel"
            className="font-game text-lg"
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="pixel" className="font-game text-lg">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
