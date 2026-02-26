# OFC Ledger Web — Projektkontext

## Översikt

Next.js 16 webbapp (App Router) för "OFC Ledger" — en poäng-, spårnings- och avräkningsapp för Open-Face Chinese Poker. Använder React 19, TypeScript, Tailwind CSS 4 och Supabase.

**Tech stack:** Next.js 16.1.6 · React 19.2.3 · TypeScript 5 · Tailwind CSS 4 · PostCSS · Supabase (supabase-js 2.97)

**Filstruktur:**
```
ofc-ledger-web/
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── public/                    # SVG-assets (file, globe, next, vercel, window)
└── src/
    ├── app/
    │   ├── globals.css        # Tailwind + custom CSS (tema, card, btn-gold, prose-ofc)
    │   ├── layout.tsx         # Root layout (fonts, Header)
    │   ├── page.tsx           # Startsida (hero, features, CTA)
    │   ├── privacy/page.tsx   # Privacy Policy
    │   ├── rules/page.tsx     # OFC-regler
    │   └── hand/[id]/page.tsx # Delad hand (server-side Supabase-fetch)
    └── components/
        ├── Header.tsx         # Sticky header med mobil hamburger-meny
        ├── LogoHero.tsx       # Stor isometrisk SVG-logga
        ├── LogoOutline.tsx    # Outline-variant av loggan (header)
        └── RulesNav.tsx       # Scrollspy-nav för regelsidan
```

---

## Konfigurationsfiler

### package.json
```json
{
  "name": "ofc-ledger-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.97.0",
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### next.config.ts
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": [
    "next-env.d.ts", "**/*.ts", "**/*.tsx",
    ".next/types/**/*.ts", ".next/dev/types/**/*.ts", "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

### postcss.config.mjs
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### eslint.config.mjs
```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

---

## Källkod

### src/app/globals.css
```css
@import "tailwindcss";

:root {
  --color-bg: #1e3a2f;
  --color-bg-light: #254a3b;
  --color-gold: #ffd700;
  --color-gold-dim: #bfa230;
  --color-muted: #a3c2b0;
  --color-card: #1a3328;
  --color-card-border: #2d5a47;
}

@theme inline {
  --color-background: var(--color-bg);
  --color-foreground: var(--color-muted);
  --font-display: var(--font-playfair);
  --font-body: var(--font-dm-sans);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-bg);
  color: var(--color-muted);
  font-family: var(--font-body), system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display), serif;
  color: var(--color-gold);
}

/* Card component */
.card {
  background: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: 1rem;
  padding: 1.25rem;
}

@media (min-width: 640px) {
  .card {
    padding: 2rem;
  }
}

/* Gold button */
.btn-gold {
  border: 2px solid var(--color-gold);
  color: var(--color-gold);
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;
  font-size: 0.875rem;
}

@media (min-width: 640px) {
  .btn-gold {
    padding: 0.75rem 2rem;
    font-size: 1rem;
  }
}

.btn-gold:not(:disabled):hover {
  background: var(--color-gold);
  color: var(--color-bg);
}

.btn-gold:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Prose styles for content pages */
.prose-ofc h1 { font-size: 1.75rem; margin-bottom: 1rem; }
.prose-ofc h2 { font-size: 1.25rem; margin-top: 2rem; margin-bottom: 0.75rem; }
.prose-ofc h3 { font-size: 1.125rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }

@media (min-width: 640px) {
  .prose-ofc h1 { font-size: 2.25rem; }
  .prose-ofc h2 { font-size: 1.5rem; margin-top: 2.5rem; }
  .prose-ofc h3 { font-size: 1.25rem; margin-top: 2rem; }
}

.prose-ofc p { margin-bottom: 1rem; line-height: 1.75; }
.prose-ofc ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
.prose-ofc ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
.prose-ofc li { margin-bottom: 0.25rem; line-height: 1.75; }
.prose-ofc strong { color: var(--color-gold); font-weight: 600; }

/* Responsive tables */
.prose-ofc .table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1.5rem;
}

.prose-ofc table { width: 100%; border-collapse: collapse; min-width: 320px; }
.prose-ofc th { text-align: left; padding: 0.5rem 0.75rem; border-bottom: 2px solid var(--color-card-border); color: var(--color-gold); font-weight: 600; font-size: 0.875rem; }
.prose-ofc td { padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--color-card-border); font-size: 0.875rem; }
.prose-ofc tr:hover { background: var(--color-bg-light); }
```

### src/app/layout.tsx
```tsx
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono, Anton } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OFC Ledger",
  description: "Score, track, and settle your Open-Face Chinese Poker sessions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} ${anton.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
```

### src/app/page.tsx
```tsx
import LogoHero from "@/components/LogoHero";

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
      <section className="flex flex-col items-center justify-center px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-24 sm:pb-16">
        <LogoHero size={120} />
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:mt-8 sm:text-6xl">
          OFC LEDGER
        </h1>
        <p className="mt-3 text-lg text-[var(--color-muted)] sm:mt-4 sm:text-xl">
          For grinders and gamblers.
        </p>
        <button disabled className="btn-gold mt-8 sm:mt-10">
          Coming Soon
        </button>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        <h2 className="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl">Features</h2>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="card">
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-semibold sm:text-xl">{f.title}</h3>
              <p className="text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-xl px-4 py-12 text-center sm:px-6 sm:py-20">
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Join the Beta</h2>
        <p className="mb-6 text-sm text-[var(--color-muted)] sm:mb-8 sm:text-base">
          Be the first to know when OFC Ledger launches.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
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
```

### src/app/privacy/page.tsx
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — OFC Ledger",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-16 prose-ofc">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-[var(--color-muted)]/60">
        Last updated: 2026-02-24
      </p>

      <h2>Pre-Launch Status</h2>
      <p>
        OFC Ledger is currently in pre-launch development. The application does not
        collect, store, or process any personal data at this time.
      </p>

      <h2>What We Will Collect</h2>
      <p>
        When the service launches, we may collect the following information to provide
        and improve the product:
      </p>
      <ul>
        <li>Email address (for account creation and notifications)</li>
        <li>Game session data (hands played, scores, settings)</li>
        <li>Basic usage analytics (page views, feature usage)</li>
      </ul>

      <h2>What We Will Never Do</h2>
      <ul>
        <li>Sell your personal data to third parties</li>
        <li>Share your game data without your explicit consent</li>
        <li>Use your data for purposes unrelated to OFC Ledger</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach out at{" "}
        <strong>privacy@ofcledger.com</strong>.
      </p>
    </main>
  );
}
```

### src/app/rules/page.tsx
```tsx
import type { Metadata } from "next";
import RulesNav from "@/components/RulesNav";

export const metadata: Metadata = {
  title: "Rules — OFC Ledger",
  description: "Learn how to play Open-Face Chinese Poker (OFC).",
};

export default function RulesPage() {
  return (
    <>
      {/* Mobile: sticky horizontal nav at page top level */}
      <RulesNav variant="mobile" />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-16 lg:flex lg:gap-10">
        {/* Desktop: sticky sidebar */}
        <aside className="hidden shrink-0 lg:block lg:w-48">
          <RulesNav variant="desktop" />
        </aside>

        <main className="min-w-0 flex-1 prose-ofc">
          <h1>Open-Face Chinese Poker Rules</h1>

          {/* ───── What is OFC? ───── */}
          <section id="what-is-ofc">
            <h2>What is OFC?</h2>
            <p>
              Open-Face Chinese Poker (OFC) is a turn-based poker variant where players set 13 cards
              across three hands — <strong>Top</strong> (3 cards), <strong>Middle</strong> (5 cards),
              and <strong>Bottom</strong> (5 cards) — aiming to beat their opponents row by row.
            </p>
            <p>
              OFC is played with a standard 52-card deck, typically between 2–3 players.
              Unlike traditional poker, there is no betting — scoring is based on points.
              Each point has an agreed-upon monetary value.
            </p>

            <h3>Dealing</h3>
            <ul>
              <li>Each player receives <strong>5 cards face-up</strong> to start and must place them on their board.</li>
              <li>After the initial placement, players draw <strong>1 card at a time</strong> and place it on any open row.</li>
              <li>This continues until all 13 slots are filled.</li>
              <li>Cards cannot be moved once placed.</li>
            </ul>

            <h3>Setting Your Hands</h3>
            <p>
              Hands must be ranked in ascending order from top to bottom:
            </p>
            <ul>
              <li><strong>Bottom</strong> must be the strongest hand (or equal to Middle).</li>
              <li><strong>Middle</strong> must be stronger than (or equal to) Top.</li>
              <li><strong>Top</strong> is the weakest hand (only 3 cards — pairs and high cards matter most).</li>
            </ul>
            <p>
              If your hands are not in valid order, you <strong>foul</strong> (also called &quot;mis-set&quot;)
              and lose 6 points to each opponent.
            </p>
          </section>

          {/* ───── Game Variants ───── */}
          <section id="game-variants">
            <h2>Game Variants</h2>

            <h3>Regular OFC</h3>
            <p>
              The standard game described above. Players receive 5 cards initially, then draw one at a time.
              Standard scoring with royalties and Fantasy Land.
            </p>

            <h3>Pineapple OFC</h3>
            <p>
              The most popular variant. After the initial 5-card placement, players draw <strong>3 cards</strong> at
              a time, place 2, and discard 1. This creates more action and bigger hands.
            </p>
            <ul>
              <li>Fantasy Land in Pineapple: you receive <strong>14 cards</strong> (place 13, discard 1).</li>
              <li>Entry requirement is the same: pair of Queens or better on top.</li>
            </ul>

            <h3>Progressive Pineapple</h3>
            <p>
              A variant where the first draw after the initial 5 cards is 2 cards (place 1, discard 1),
              followed by 3-card draws (place 2, discard 1) for the remaining rounds.
            </p>
          </section>

          {/* ───── Scoring ───── */}
          <section id="scoring">
            <h2>Scoring</h2>
            <p>
              Players compare each row head-to-head. For each row you win, you earn <strong>+1 point</strong>;
              for each loss, <strong>−1 point</strong>.
            </p>
            <p>
              <strong>Scoop bonus:</strong> If you win all three rows against an opponent, you earn a
              <strong> +3 bonus</strong> (6 total instead of 3).
            </p>

            <h3>Royalties</h3>
            <p>
              Bonus points are awarded for premium hands in each row. Royalties are collected
              regardless of whether you win the row.
            </p>

            <h3>Bottom Royalties</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Hand</th><th>Points</th></tr>
                </thead>
                <tbody>
                  <tr><td>Straight</td><td>+2</td></tr>
                  <tr><td>Flush</td><td>+4</td></tr>
                  <tr><td>Full House</td><td>+6</td></tr>
                  <tr><td>Four of a Kind</td><td>+10</td></tr>
                  <tr><td>Straight Flush</td><td>+15</td></tr>
                  <tr><td>Five of a Kind</td><td>+25</td></tr>
                  <tr><td>Royal Flush</td><td>+25</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Middle Royalties</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Hand</th><th>Points</th></tr>
                </thead>
                <tbody>
                  <tr><td>Three of a Kind</td><td>+2</td></tr>
                  <tr><td>Straight</td><td>+4</td></tr>
                  <tr><td>Flush</td><td>+8</td></tr>
                  <tr><td>Full House</td><td>+12</td></tr>
                  <tr><td>Four of a Kind</td><td>+20</td></tr>
                  <tr><td>Straight Flush</td><td>+30</td></tr>
                  <tr><td>Five of a Kind</td><td>+50</td></tr>
                  <tr><td>Royal Flush</td><td>+50</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Top Royalties — Pairs</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Hand</th><th>Points</th></tr>
                </thead>
                <tbody>
                  <tr><td>Pair of 6s</td><td>+1</td></tr>
                  <tr><td>Pair of 7s</td><td>+2</td></tr>
                  <tr><td>Pair of 8s</td><td>+3</td></tr>
                  <tr><td>Pair of 9s</td><td>+4</td></tr>
                  <tr><td>Pair of 10s</td><td>+5</td></tr>
                  <tr><td>Pair of Jacks</td><td>+6</td></tr>
                  <tr><td>Pair of Queens</td><td>+7</td></tr>
                  <tr><td>Pair of Kings</td><td>+8</td></tr>
                  <tr><td>Pair of Aces</td><td>+9</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Top Royalties — Trips</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Hand</th><th>Points</th></tr>
                </thead>
                <tbody>
                  <tr><td>Trips 2s</td><td>+10</td></tr>
                  <tr><td>Trips 3s</td><td>+11</td></tr>
                  <tr><td>Trips 4s</td><td>+12</td></tr>
                  <tr><td>Trips 5s</td><td>+13</td></tr>
                  <tr><td>Trips 6s</td><td>+14</td></tr>
                  <tr><td>Trips 7s</td><td>+15</td></tr>
                  <tr><td>Trips 8s</td><td>+16</td></tr>
                  <tr><td>Trips 9s</td><td>+17</td></tr>
                  <tr><td>Trips 10s</td><td>+18</td></tr>
                  <tr><td>Trips Jacks</td><td>+19</td></tr>
                  <tr><td>Trips Queens</td><td>+20</td></tr>
                  <tr><td>Trips Kings</td><td>+21</td></tr>
                  <tr><td>Trips Aces</td><td>+22</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ───── Fantasy Land ───── */}
          <section id="fantasy-land">
            <h2>Fantasy Land</h2>
            <p>
              If you place <strong>a pair of Queens or better</strong> on top (without fouling),
              you enter <strong>Fantasy Land</strong> on the next hand.
            </p>
            <ul>
              <li>In Fantasy Land, you receive all <strong>13 cards at once</strong> and set them face-down.</li>
              <li>Other players continue drawing one card at a time as normal.</li>
              <li>
                You <strong>stay in Fantasy Land</strong> if you make: Three of a Kind on Top,
                Full House or better on Middle, or Quads or better on Bottom.
              </li>
            </ul>

            <h3>Pineapple Fantasy Land</h3>
            <p>
              In Pineapple OFC, Fantasy Land gives you <strong>14 cards</strong> — set 13 and
              discard 1. The stay requirements are the same as regular OFC.
            </p>
          </section>

          {/* ───── Optional Rules ───── */}
          <section id="optional-rules">
            <h2>Optional Rules</h2>

            <h3>Progressive Fantasy Land</h3>
            <p>
              Some games award <strong>15 cards</strong> in Fantasy Land for stronger qualifying
              hands (e.g., KK+ on top), and <strong>16 cards</strong> for AA+ on top. Players
              discard extra cards down to 13.
            </p>

            <h3>Joker Variant</h3>
            <p>
              A Joker is added to the deck and acts as a wild card. The Joker can complete
              any hand but scores as an Ace-high for non-made hands.
            </p>

            <h3>2–3 Player Adjustments</h3>
            <ul>
              <li><strong>2 players:</strong> Standard rules, each player uses 13 of 52 cards.</li>
              <li><strong>3 players:</strong> Standard rules, but card counting becomes more important as 39 of 52 cards are in play.</li>
            </ul>
          </section>

          {/* ───── Glossary ───── */}
          <section id="glossary">
            <h2>Glossary</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Term</th><th>Definition</th></tr>
                </thead>
                <tbody>
                  <tr><td><strong>Foul / Mis-set</strong></td><td>When your hands are not in valid ascending order. Costs 6 points per opponent.</td></tr>
                  <tr><td><strong>Royalty</strong></td><td>Bonus points for premium hands placed in a specific row.</td></tr>
                  <tr><td><strong>Scoop</strong></td><td>Winning all three rows against an opponent (+3 bonus).</td></tr>
                  <tr><td><strong>Fantasy Land</strong></td><td>Receiving all 13 (or 14) cards at once after qualifying with QQ+ on top.</td></tr>
                  <tr><td><strong>Pineapple</strong></td><td>Variant where you draw 3, place 2, discard 1 after the initial deal.</td></tr>
                  <tr><td><strong>Stay / Re-Fantasy</strong></td><td>Remaining in Fantasy Land by meeting the stay requirements.</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
```

### src/app/hand/[id]/page.tsx
```tsx
import { createClient } from "@supabase/supabase-js";

/* ── Types ── */

interface CardDetail {
  cards: string[];
  name: string;
  pts: number;
  rankValue: number;
}

interface PlayerAnalysis {
  isFoul: boolean;
  details: { top: CardDetail; mid: CardDetail; bot: CardDetail };
  royalties: number;
  multiplier: number;
  bonusMessage: string | null;
}

interface PlayerData {
  player: string;
  analysis: PlayerAnalysis;
  fantasyLand: { isActive: boolean };
  choice?: { hasAbility: boolean };
}

interface SharedHand {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hand_data: any;
  round_index: number;
  game_id?: string;
}

/* ── Card parsing ── */

const suitMap: Record<string, string> = {
  h: "\u2665",
  s: "\u2660",
  d: "\u2666",
  c: "\u2663",
};
const redSuits = new Set(["h", "d"]);
const validSuits = new Set(["h", "s", "d", "c"]);

function parseCard(str: string) {
  // "JJ" → joker displayed as Jack
  if (str === "JJ") {
    return { rank: "J", suit: "", isRed: false, isJoker: true };
  }

  let rank: string;
  let suitChar: string;
  let isJoker = false;

  if (str.length > 2 && str.endsWith("J") && validSuits.has(str[str.length - 2])) {
    // "AhJ" → rank=A, suit=h, joker
    suitChar = str[str.length - 2];
    rank = str.slice(0, -2);
    isJoker = true;
  } else if (str.length > 2 && str[str.length - 2] === "J" && validSuits.has(str[str.length - 1])) {
    // "AJh" → rank=A, suit=h, joker
    suitChar = str[str.length - 1];
    rank = str.slice(0, -2);
    isJoker = true;
  } else {
    // Normal: "Ah"
    suitChar = str[str.length - 1];
    rank = str.slice(0, -1);
  }

  return {
    rank,
    suit: suitMap[suitChar] ?? "",
    isRed: redSuits.has(suitChar),
    isJoker,
  };
}

/* ── Pairwise head-to-head ── */

interface PairH2H {
  opponentName: string;
  label: string;
  h2h: number;
}

function computePairH2H(me: PlayerData, opp: PlayerData): PairH2H {
  const myFoul = me.analysis.isFoul;
  const oppFoul = opp.analysis.isFoul;

  if (myFoul && oppFoul) {
    return { opponentName: opp.player, label: "FOUL", h2h: 0 };
  }
  if (myFoul) {
    return { opponentName: opp.player, label: "FOUL", h2h: -6 };
  }
  if (oppFoul) {
    return { opponentName: opp.player, label: "SCOOP", h2h: 6 };
  }

  const rows = ["top", "mid", "bot"] as const;
  let wins = 0;
  let losses = 0;
  for (const r of rows) {
    const myVal = me.analysis.details[r].rankValue;
    const oppVal = opp.analysis.details[r].rankValue;
    if (myVal > oppVal) wins++;
    else if (oppVal > myVal) losses++;
  }

  const scoop = wins === 3 ? 3 : losses === 3 ? -3 : 0;
  const h2h = (wins - losses) + scoop;
  const label = wins === 3 ? "SCOOP" : `${wins}\u2013${losses}`;

  return { opponentName: opp.player, label, h2h };
}

/* ── Format score with sign ── */

function fmtScore(n: number, suffix = "p") {
  if (n > 0) return `+${n}${suffix}`;
  if (n < 0) return `\u2212${Math.abs(n)}${suffix}`;
  return `0${suffix}`;
}

/* ── Not-found fallback ── */

function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-anton)] text-3xl text-[var(--color-gold)]">
          Hand Not Found
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          This hand may have been removed or the link is invalid.
        </p>
      </div>
    </main>
  );
}

/* ── Playing card ── */

function PlayingCard({
  code,
  overlap,
  isLast,
}: {
  code: string;
  overlap: boolean;
  isLast: boolean;
}) {
  const { rank, suit, isRed, isJoker } = parseCard(code);

  const baseShadow = overlap
    ? "-2px 0 4px rgba(0,0,0,0.3)"
    : "0 1px 4px rgba(0,0,0,0.35)";
  const jokerShadow = "0 0 6px rgba(255,215,0,0.4), inset 0 0 0 1px rgba(255,215,0,0.2)";

  return (
    <span
      className="relative inline-flex items-center justify-center rounded-[6px] font-[family-name:var(--font-dm-mono)] text-[13px] font-[800] leading-none"
      style={{
        width: 36,
        height: 52,
        backgroundColor: "#f5f0e8",
        color: isRed ? "#cc2200" : "#1a1a1a",
        border: isJoker ? "2px solid #ffd700" : undefined,
        boxShadow: isJoker ? `${baseShadow}, ${jokerShadow}` : baseShadow,
        marginRight: overlap && !isLast ? -10 : 0,
        zIndex: isLast ? 5 : undefined,
      }}
    >
      {rank}{suit}
    </span>
  );
}

/* ── Board row ── */

function BoardRow({
  label,
  data,
}: {
  label: string;
  data: CardDetail;
}) {
  const overlap = data.cards.length > 1;

  return (
    <div>
      <div className="mb-1 font-[family-name:var(--font-dm-mono)] text-[9px] uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex">
          {data.cards.map((c, i) => (
            <PlayingCard
              key={i}
              code={c}
              overlap={overlap}
              isLast={i === data.cards.length - 1}
            />
          ))}
        </div>
        <div className="ml-auto flex min-w-[120px] flex-col items-end">
          <span className="font-[family-name:var(--font-dm-mono)] text-[11px] italic text-[var(--color-muted)]">
            {data.name}
          </span>
          {data.pts > 0 && (
            <span className="font-[family-name:var(--font-dm-mono)] text-[10px] text-[var(--color-gold)]">
              +{data.pts}p
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */

export default async function HandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("shared_hands")
    .select("*")
    .eq("id", id)
    .single();

  if (!data || error) return <NotFound />;

  const hand = data as SharedHand;
  const raw = hand.hand_data;
  const players: PlayerData[] = Array.isArray(raw) ? raw : (raw?.hands || []);
  const scores: Record<string, number> | null = Array.isArray(raw) ? null : (raw?.scores || null);

  return (
    <main className="mx-auto max-w-[480px] px-4 py-6">
      {/* Player cards */}
      <div className="flex flex-col gap-4">
        {players.map((player, idx) => {
          const isFoul = player.analysis.isFoul;

          /* Pairwise results vs each opponent */
          const pairs = players
            .filter((_, i) => i !== idx)
            .map((opp) => computePairH2H(player, opp));
          const totalH2H = pairs.reduce((sum, p) => sum + p.h2h, 0);

          /* Royalties: net & gross */
          const d = player.analysis.details;
          const bruttoRoyalties =
            (d?.top?.pts || 0) + (d?.mid?.pts || 0) + (d?.bot?.pts || 0);
          const effectiveRoy = isFoul ? 0 : player.analysis.royalties;
          const oppRoySum = players
            .filter((_, i) => i !== idx)
            .reduce(
              (sum, opp) =>
                sum + (opp.analysis.isFoul ? 0 : opp.analysis.royalties),
              0
            );
          const netRoy = effectiveRoy - oppRoySum;

          /* Total score: use pre-computed if available, else calculate */
          const mult = Math.max(
            ...players.map((p) => p.analysis.multiplier || 1)
          );
          const score =
            scores && scores[player.player] != null
              ? scores[player.player]
              : (totalH2H + netRoy) * mult;
          const scoreColor =
            score > 0
              ? "#4caf50"
              : score < 0
                ? "#ef5350"
                : "var(--color-muted)";

          /* Badges */
          const badges: { label: string; bg: string }[] = [];
          if (player.fantasyLand?.isActive) {
            badges.push({ label: "FL", bg: "#9c27b0" });
          }
          if (player.choice?.hasAbility) {
            badges.push({ label: "TC", bg: "#0066cc" });
          }

          return (
            <div key={idx} className="rounded-[14px] bg-black/20 p-4">
              {/* Player header */}
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-white">
                      {player.player}
                    </span>
                    {badges.map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold text-white"
                        style={{
                          backgroundColor: b.bg,
                          borderRadius: 20,
                          padding: "2px 7px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>
                  {/* Per-opponent result lines */}
                  {pairs.length > 0 && (
                    <div className="mt-1 flex flex-col gap-0.5 font-[family-name:var(--font-dm-mono)] text-[11px]">
                      {pairs.map((pair, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span style={{ color: "#a3c2b0" }}>
                            vs {pair.opponentName}:
                          </span>
                          <span style={{ color: "#ffd700" }}>
                            {pair.label}
                          </span>
                          <span
                            style={{
                              color:
                                pair.h2h > 0
                                  ? "#4caf50"
                                  : pair.h2h < 0
                                    ? "#ef5350"
                                    : "#a3c2b0",
                            }}
                          >
                            {fmtScore(pair.h2h)}
                          </span>
                        </div>
                      ))}
                      {/* Royalties line */}
                      <div className="flex items-center gap-1.5">
                        <span style={{ color: "#ffd700" }}>{"\u{1F451}"}</span>
                        <span
                          style={{
                            color:
                              netRoy > 0
                                ? "#4caf50"
                                : netRoy < 0
                                  ? "#ef5350"
                                  : "#a3c2b0",
                          }}
                        >
                          {fmtScore(netRoy)}
                        </span>
                        <span
                          style={{
                            color: "#ffd700",
                            opacity: isFoul ? 0.5 : 1,
                          }}
                        >
                          ({bruttoRoyalties}p)
                        </span>
                        {player.analysis.multiplier > 1 &&
                          player.analysis.bonusMessage && (
                            <>
                              <span
                                style={{ color: "#a3c2b0", opacity: 0.4 }}
                              >
                                |
                              </span>
                              <span
                                className="text-[10px] font-semibold"
                                style={{
                                  background: "rgba(255,215,0,0.12)",
                                  border: "1px solid rgba(255,215,0,0.3)",
                                  borderRadius: 20,
                                  padding: "2px 8px",
                                  color: "#ffd700",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                {player.analysis.bonusMessage}
                              </span>
                            </>
                          )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className="font-[family-name:var(--font-anton)] text-[32px] leading-none"
                    style={{ color: scoreColor }}
                  >
                    {score > 0 ? `+${score}` : score}
                  </div>
                </div>
              </div>

              {/* Board — dim if foul */}
              <div
                className="flex flex-col gap-2"
                style={{ opacity: isFoul ? 0.5 : 1 }}
              >
                <BoardRow label="TOP" data={player.analysis.details.top} />
                <BoardRow label="MID" data={player.analysis.details.mid} />
                <BoardRow label="BOT" data={player.analysis.details.bot} />
              </div>

            </div>
          );
        })}
      </div>

      {/* CTA footer */}
      <div
        className="mt-6 flex flex-col items-center text-center"
        style={{
          borderTop: "1px solid rgba(255,215,0,0.08)",
          padding: "24px 20px 40px",
        }}
      >
        <span className="text-[11px] text-[var(--color-muted)]">Played with</span>
        <span className="mt-1 font-[family-name:var(--font-anton)] text-lg tracking-wider text-[var(--color-gold)]">
          OFC LEDGER
        </span>
        <span className="mt-0.5 text-[11px] italic text-[var(--color-muted)]">
          For grinders and gamblers.
        </span>
        <span
          className="mt-4 text-[12px] uppercase"
          style={{
            border: "1px solid rgba(255,215,0,0.3)",
            borderRadius: 20,
            padding: "8px 20px",
            color: "#ffd700",
            opacity: 0.5,
            letterSpacing: "2px",
            cursor: "default",
          }}
        >
          Download — Coming Soon
        </span>
      </div>
    </main>
  );
}
```

### src/components/Header.tsx
```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import LogoOutline from "./LogoOutline";

const links = [
  { href: "/", label: "Home" },
  { href: "/rules", label: "Rules" },
  { href: "/privacy", label: "Privacy" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg)]/80 border-b border-[var(--color-card-border)]">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <LogoOutline size={32} />
          <span className="font-[family-name:var(--font-display)] text-base font-bold tracking-wider text-[var(--color-gold)] sm:text-lg">
            OFC LEDGER
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 text-sm sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-[var(--color-gold)]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 sm:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-[var(--color-gold)] transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-[var(--color-gold)] transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-[var(--color-gold)] transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--color-card-border)] px-4 pb-4 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm transition-colors hover:text-[var(--color-gold)]"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
```

### src/components/LogoHero.tsx
```tsx
export default function LogoHero({ size = 120 }: { size?: number }) {
  const top = "#ffd700";
  const left = "#9a7a00";
  const right = "#b89500";

  return (
    <svg
      width={size}
      height={size}
      viewBox="10 2 80 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Slab 3 (bottom) */}
      <polygon points="50,26 80,41 50,56 20,41" fill={top} />
      <polygon points="20,41 50,56 50,66 20,51" fill={left} />
      <polygon points="80,41 50,56 50,66 80,51" fill={right} />

      {/* Slab 2 (middle) */}
      <polygon points="50,18 72,29 50,40 28,29" fill={top} />
      <polygon points="28,29 50,40 50,50 28,39" fill={left} />
      <polygon points="72,29 50,40 50,50 72,39" fill={right} />

      {/* Slab 1 (top) */}
      <polygon points="50,10 64,17 50,24 36,17" fill={top} />
      <polygon points="36,17 50,24 50,34 36,27" fill={left} />
      <polygon points="64,17 50,24 50,34 64,27" fill={right} />
    </svg>
  );
}
```

### src/components/LogoOutline.tsx
```tsx
export default function LogoOutline({ size = 32 }: { size?: number }) {
  const s = "#ffd700";
  const f = "#1e3a2f";
  const sw = 1.3;

  return (
    <svg
      width={size}
      height={size}
      viewBox="10 2 80 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Slab 3 (bottom) — fills */}
      <polygon points="50,26 80,41 50,56 20,41" fill={f} />
      <polygon points="20,41 50,56 50,66 20,51" fill={f} />
      <polygon points="80,41 50,56 50,66 80,51" fill={f} />
      {/* Slab 3 — strokes: outer contour + internal V */}
      <path d="M20,51 L20,41 L50,26 L80,41 L80,51 L50,66 Z" fill="none" stroke={s} strokeWidth={sw} />
      <polyline points="20,41 50,56 80,41" fill="none" stroke={s} strokeWidth={sw} />

      {/* Slab 2 (middle) — fills */}
      <polygon points="50,18 72,29 50,40 28,29" fill={f} />
      <polygon points="28,29 50,40 50,50 28,39" fill={f} />
      <polygon points="72,29 50,40 50,50 72,39" fill={f} />
      {/* Slab 2 — strokes */}
      <path d="M28,39 L28,29 L50,18 L72,29 L72,39 L50,50 Z" fill="none" stroke={s} strokeWidth={sw} />
      <polyline points="28,29 50,40 72,29" fill="none" stroke={s} strokeWidth={sw} />

      {/* Slab 1 (top) — fills */}
      <polygon points="50,10 64,17 50,24 36,17" fill={f} />
      <polygon points="36,17 50,24 50,34 36,27" fill={f} />
      <polygon points="64,17 50,24 50,34 64,27" fill={f} />
      {/* Slab 1 — strokes */}
      <path d="M36,27 L36,17 L50,10 L64,17 L64,27 L50,34 Z" fill="none" stroke={s} strokeWidth={sw} />
      <polyline points="36,17 50,24 64,17" fill="none" stroke={s} strokeWidth={sw} />
    </svg>
  );
}
```

### src/components/RulesNav.tsx
```tsx
"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "what-is-ofc", label: "What is OFC?" },
  { id: "game-variants", label: "Game Variants" },
  { id: "scoring", label: "Scoring" },
  { id: "fantasy-land", label: "Fantasy Land" },
  { id: "optional-rules", label: "Optional Rules" },
  { id: "glossary", label: "Glossary" },
];

export default function RulesNav({ variant }: { variant: "mobile" | "desktop" }) {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (variant === "mobile") {
    return (
      <nav className="sticky top-[53px] z-40 overflow-x-auto border-b border-[var(--color-card-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm px-4 py-2 lg:hidden">
        <div className="flex gap-3 whitespace-nowrap">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleClick(s.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active === s.id
                  ? "bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-gold)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-24 hidden h-fit lg:block">
      <ul className="flex flex-col gap-1">
        {sections.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => handleClick(s.id)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                active === s.id
                  ? "bg-[var(--color-gold)]/10 font-semibold text-[var(--color-gold)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-gold)]"
              }`}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

## Miljövariabler

Appen förväntar sig dessa i `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<din-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<din-supabase-anon-key>
```

## Supabase-tabell

Sidan `/hand/[id]` hämtar data från tabellen `shared_hands` med kolumnerna:
- `id` (UUID, primary key)
- `hand_data` (JSONB — innehåller antingen en array av PlayerData eller ett objekt `{ hands: PlayerData[], scores: Record<string, number> }`)
- `round_index` (integer)
- `game_id` (text, optional)
