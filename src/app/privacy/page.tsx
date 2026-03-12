import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — OFC Ledger",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-16 prose-ofc">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-[var(--color-muted)]/60">
        Last updated: 2026-03-12
      </p>

      <p>
        OFC Ledger is currently available as an Android beta. This policy
        explains what data we collect, why, and how you can control it.
      </p>

      <h2>What We Collect</h2>
      <p>To provide the service, we collect:</p>
      <ul>
        <li>Email address — used for account creation and password reset</li>
        <li>Username — your display name in games</li>
        <li>Game data — hands played, scores, and match history</li>
        <li>
          Push notification token — to notify you when it&apos;s your turn
          (only if you enable notifications)
        </li>
      </ul>
      <p>
        We do not collect location data, contacts, or any data unrelated
        to the app.
      </p>

      <h2>Why We Collect It</h2>
      <p>
        Your data is used solely to operate OFC Ledger — to run games,
        track scores, and send turn notifications. Nothing else.
      </p>

      <h2>How Long We Keep It</h2>
      <p>
        We keep your data for as long as your account is active. If you
        delete your account, your profile and authentication data are
        permanently deleted. Game history from completed matches —
        including your username as it appeared in those games — may be
        retained to preserve the integrity of other players&apos; records
        and statistics. Your username in this context is a pseudonym with
        no remaining link to your personal identity once your account is
        deleted.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal data
        at any time. To delete your account and all associated data, go to
        Preferences in the app and tap &quot;Delete account&quot;. This is
        immediate and cannot be undone.
      </p>
      <p>
        For any other requests, contact us at{" "}
        <strong>hello@ofcledger.com</strong>.
      </p>

      <h2>What We Will Never Do</h2>
      <ul>
        <li>Sell your data to third parties</li>
        <li>Share your game data without your explicit consent</li>
        <li>Use your data for advertising or purposes unrelated to OFC Ledger</li>
      </ul>

      <h2>Third Parties</h2>
      <p>OFC Ledger uses the following services to operate:</p>
      <ul>
        <li>Supabase — database and authentication (EU region, Frankfurt)</li>
        <li>Expo / Google Firebase — push notifications (Android)</li>
        <li>Google Gemini — AI-powered card reading (images are not stored)</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach out at{" "}
        <strong>hello@ofcledger.com</strong>.
      </p>
    </main>
  );
}
