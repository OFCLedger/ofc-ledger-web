import Logo from "@/components/Logo";

const features = [
  {
    icon: "📷",
    title: "AI Camera Scoring",
    description: "Point your phone at the table and let AI read every hand instantly.",
  },
  {
    icon: "🌐",
    title: "Online Play",
    description: "Play OFC against friends or strangers from anywhere in the world.",
  },
  {
    icon: "🏝️",
    title: "Fantasy Land Tracking",
    description: "Automatic Fantasy Land detection and bonus scoring.",
  },
  {
    icon: "⚡",
    title: "Live Sessions",
    description: "Real-time ledger updates so everyone stays on the same page.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <Logo size={96} />
        <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl">
          OFC LEDGER
        </h1>
        <p className="mt-4 text-xl text-[var(--color-muted)]">
          For grinders and gamblers.
        </p>
        <button disabled className="btn-gold mt-10">
          Coming Soon
        </button>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">Features</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="card">
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-xl px-6 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold">Join the Beta</h2>
        <p className="mb-8 text-[var(--color-muted)]">
          Be the first to know when OFC Ledger launches.
        </p>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            disabled
            className="flex-1 rounded-full border border-[var(--color-card-border)] bg-[var(--color-card)] px-5 py-3 text-sm text-[var(--color-muted)] placeholder:text-[var(--color-muted)]/50 focus:outline-none"
          />
          <button disabled className="btn-gold">
            Notify Me
          </button>
        </div>
        <p className="mt-4 text-xs text-[var(--color-muted)]/60">
          Coming soon — no data is collected yet.
        </p>
      </section>
    </main>
  );
}
