"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LogoHero from "@/components/LogoHero";

export default function JoinPage() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!gameId) return;
    // Försök öppna appen direkt
    window.location.href = `ofcledger://join?gameId=${gameId}`;
    // Efter 2s, visa fallback-UI (appen öppnades troligen inte)
    const t = setTimeout(() => setTried(true), 2000);
    return () => clearTimeout(t);
  }, [gameId]);

  if (!gameId) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
        <LogoHero size={80} />
        <h1 className="text-2xl">Invalid invite link</h1>
        <p className="text-[var(--color-muted)]">This link doesn&apos;t contain a valid Game ID.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <LogoHero size={80} />
      <h1 className="text-2xl font-bold">You&apos;re invited to play OFC</h1>

      {!tried ? (
        <p className="text-[var(--color-muted)]">Opening OFC Ledger…</p>
      ) : (
        <>
          <p className="text-[var(--color-muted)] max-w-sm">
            Couldn&apos;t open the app automatically. Make sure OFC Ledger is installed, then tap the button below.
          </p>
          <a
            href={`ofcledger://join?gameId=${gameId}`}
            className="btn-gold"
          >
            Open in OFC Ledger
          </a>
          <p className="text-xs text-[var(--color-muted)] opacity-60">
            Don&apos;t have the app?{" "}
            <a href="/" className="underline hover:text-[var(--color-gold)]">
              Learn more
            </a>
          </p>
        </>
      )}

      <div
        className="card mt-4 font-mono text-xs text-[var(--color-muted)] opacity-60"
        style={{ letterSpacing: "0.1em" }}
      >
        Game ID: {gameId}
      </div>
    </main>
  );
}
