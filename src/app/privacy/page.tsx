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
