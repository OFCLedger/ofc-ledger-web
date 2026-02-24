import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hand Viewer — OFC Ledger",
};

const rows = ["Top (3 cards)", "Middle (5 cards)", "Bottom (5 cards)"];

export default async function HandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-16">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Hand #{id}</h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]/60 sm:mb-10">
        This page will display hand details once connected to a data source.
      </p>

      <div className="grid gap-4 sm:gap-8 sm:grid-cols-2">
        {["Player 1", "Player 2"].map((player) => (
          <div key={player} className="card">
            <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">{player}</h2>
            <div className="flex flex-col gap-2 sm:gap-3">
              {rows.map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-between rounded-lg border border-[var(--color-card-border)] bg-[var(--color-bg)] px-3 py-2.5 sm:px-4 sm:py-3"
                >
                  <span className="text-xs font-medium text-[var(--color-gold)] sm:text-sm">
                    {row}
                  </span>
                  <span className="text-xs text-[var(--color-muted)]/50">
                    —
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
