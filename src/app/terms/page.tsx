import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — OFC Ledger",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-16 prose-ofc">
      <h1>Terms of Service</h1>
      <p className="text-sm text-[var(--color-muted)]/60">
        OFC Ledger &nbsp;|&nbsp; Last updated: March 12, 2026
      </p>

      <h2>1. General</h2>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of the mobile
        application OFC Ledger (&quot;the App&quot;), provided by Erik Backlund,
        an individual residing in Sweden (&quot;we&quot;, &quot;us&quot; or
        &quot;our&quot;).
      </p>
      <p>
        By downloading, installing or using the App, you agree to these Terms in
        their entirety. If you do not agree to the Terms, you must not use the
        App.
      </p>

      <h2>2. The Service</h2>
      <p>
        OFC Ledger is a mobile application for scorekeeping and game statistics
        in Open Face Chinese Poker. The App offers, among other things:
      </p>
      <ul>
        <li>Game registration and scoring for OFC hands</li>
        <li>Game history and statistics</li>
        <li>AI-powered card identification via camera</li>
        <li>Online multiplayer functionality</li>
      </ul>

      <h2>3. Account and Registration</h2>
      <p>
        To access the full functionality of the App, you are required to create
        an account. You are responsible for:
      </p>
      <ul>
        <li>
          Ensuring that the information you provide upon registration is accurate
          and up to date
        </li>
        <li>Keeping your login credentials confidential</li>
        <li>All activity that occurs under your account</li>
      </ul>
      <p>
        We reserve the right to suspend or delete accounts that violate these
        Terms.
      </p>

      <h2>4. Subscription and Payment</h2>
      <h3>4.1 Free Trial</h3>
      <p>
        New users receive a free trial period of three (3) days from the date of
        registration. During the trial period, the full functionality of the App
        is available at no cost.
      </p>
      <h3>4.2 Subscription Price</h3>
      <p>
        After the trial period ends, the App costs USD 2.99 per month (&quot;the
        Subscription&quot;). The App is currently in beta and payment
        functionality is not yet active. Distribution and payment details
        will be updated when the App launches publicly.
      </p>
      <h3>4.3 Renewal and Cancellation</h3>
      <ul>
        <li>
          The Subscription renews automatically on a monthly basis unless
          cancelled at least 24 hours before the start of the next renewal
          period
        </li>
        <li>
          Cancellation is done via the Google Play Store or Apple App Store under
          your subscription settings
        </li>
        <li>
          Refunds are handled in accordance with the relevant platform&apos;s
          refund policy
        </li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <p>
        The App and all its content, including but not limited to design, code,
        text, graphics and logos, are owned by us and protected by applicable
        copyright law. You are granted a limited, non-exclusive,
        non-transferable license to use the App for personal, non-commercial
        purposes.
      </p>
      <p>
        You may not copy, modify, distribute, sell or sublicense any part of the
        App, or decompile or attempt to extract its source code.
      </p>

      <h2>6. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the App for any unlawful purpose</li>
        <li>
          Interfere with or attempt to disrupt the App&apos;s functionality or
          servers
        </li>
        <li>Create false accounts or impersonate any other person</li>
        <li>
          Transmit malicious code or attempt to gain unauthorized access to our
          systems
        </li>
      </ul>

      <h2>7. Privacy and Personal Data</h2>
      <p>
        We process your personal data in accordance with our Privacy Policy,
        which is available in the App and on our website. By using the App, you
        consent to the processing of personal data as described in the Privacy
        Policy.
      </p>
      <p>
        For users in the European Economic Area, we process personal data in
        accordance with Regulation (EU) 2016/679 (GDPR). You have the right to
        access, correct, or request deletion of your personal data at any time
        by contacting us.
      </p>
      <p>
        For users in California, USA, we comply with the California Consumer
        Privacy Act (CCPA). You have the right to know what personal information
        we collect and to request its deletion.
      </p>

      <h2>8. Disclaimer and Limitation of Liability</h2>
      <p>
        The App is provided &quot;as is&quot; without warranties of any kind,
        either express or implied. We do not warrant that the App will be
        error-free, uninterrupted, or free from viruses or other harmful
        components.
      </p>
      <p>
        To the fullest extent permitted by applicable law, we shall not be
        liable for any indirect, incidental, consequential damages, loss of
        profits or loss of data arising from your use of the App.
      </p>

      <h2>9. Changes to the Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. For material
        changes, we will notify you via the App or the email address you have
        registered. Continued use of the App after changes take effect
        constitutes your acceptance of the updated Terms.
      </p>

      <h2>10. Governing Law and Dispute Resolution</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the
        laws of Sweden, without regard to its conflict of law provisions. Any
        disputes arising in connection with these Terms shall first be resolved
        through good-faith negotiation. If no agreement can be reached, disputes
        shall be finally settled by Swedish courts, with the Stockholm District
        Court as the court of first instance.
      </p>

      <h2>11. Contact</h2>
      <p>
        If you have questions about these Terms or the App, please contact us
        at:
      </p>
      <p>
        Email: <strong>hello@ofcledger.com</strong>
      </p>

      <p
        className="text-sm text-[var(--color-muted)]/60"
        style={{ marginTop: "3rem" }}
      >
        &copy; 2026 OFC Ledger. All rights reserved.
      </p>
    </main>
  );
}
