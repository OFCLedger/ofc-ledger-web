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
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold">Hand #{id}</h1>
      <p className="mb-10 text-sm text-[var(--color-muted)]/60">
        This page will display hand details once connected to a data source.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        {["Player 1", "Player 2"].map((player) => (
          <div key={player} className="card">
            <h2 className="mb-4 text-xl font-semibold">{player}</h2>
            <div className="flex flex-col gap-3">
              {rows.map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-between rounded-lg border border-[var(--color-card-border)] bg-[var(--color-bg)] px-4 py-3"
                >
                  <span className="text-sm font-medium text-[var(--color-gold)]">
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
