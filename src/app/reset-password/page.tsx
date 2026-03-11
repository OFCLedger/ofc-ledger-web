"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    if (!accessToken || type !== "recovery") {
      setError("Invalid or missing reset link.");
      setLoading(false);
      return;
    }

    supabase.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken ?? "" })
      .then(({ error }) => {
        if (error) setError(error.message);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="card w-full max-w-md text-center">
        <h1
          className="mb-6 text-2xl sm:text-3xl"
          style={{ fontFamily: "var(--font-anton), sans-serif" }}
        >
          Reset Password
        </h1>

        {loading ? (
          <p style={{ color: "var(--color-muted)" }}>Verifying link…</p>
        ) : success ? (
          <p style={{ color: "var(--color-gold)", fontWeight: 600 }}>
            Password updated! You can now log in to the app.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-card-border)",
                color: "var(--color-white)",
              }}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-card-border)",
                color: "var(--color-white)",
              }}
            />

            {error && (
              <p className="text-sm" style={{ color: "#ff6b6b" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-2"
            >
              {submitting ? "Updating…" : "Update Password"}
            </button>
          </form>
        )}

        {!loading && !success && error && !password && (
          <p className="mt-4 text-sm" style={{ color: "var(--color-muted)" }}>
            Please request a new reset link.
          </p>
        )}
      </div>
    </main>
  );
}
