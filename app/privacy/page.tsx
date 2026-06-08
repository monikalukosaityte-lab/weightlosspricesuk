import { notFound } from "next/navigation";
import NavBar from "../NavBar";
import Footer from "../Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

export default function PrivacyPage() {
  notFound();

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", display: "flex", flexDirection: "column" }}>
      <NavBar />

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 80px", flex: 1, width: "100%" }}>
        <div style={{ marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid #e2e6ef" }}>
          <h1 style={{ fontFamily: SERIF, fontSize: "2rem", fontWeight: 400, color: "#0f1f3d", marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0 }}>Last updated: June 2026</p>
        </div>

        <div style={{ background: "#e6f7f5", borderLeft: "4px solid #0e9f8a", padding: "16px 20px", marginBottom: 32 }}>
          <p style={{ fontSize: "0.85rem", color: "#0a6b5a", margin: 0, lineHeight: 1.6 }}>
            This policy explains what information we collect when you visit WeightLossPricesUK.co.uk, how we use it, and your rights under UK data protection law (UK GDPR).
          </p>
        </div>

        <div style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.75 }}>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>1. Who we are</h2>
          <p style={{ marginBottom: 14 }}>
            WeightLossPricesUK is an independent price comparison website for weight loss medications available through UK-registered online providers. We are based in the United Kingdom.
          </p>
          <p style={{ marginBottom: 14 }}>
            For any privacy-related queries, contact us at:{" "}
            <a href="mailto:contact@weightlosspricesuk.co.uk" style={{ color: "#0e9f8a" }}>contact@weightlosspricesuk.co.uk</a>
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>2. What data we collect</h2>
          <p style={{ marginBottom: 12 }}>We only collect data you provide voluntarily via the contact form:</p>
          <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
            {["First and last name", "Email address", "Reason for contact", "Message content"].map(item => (
              <li key={item} style={{ marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          <p style={{ marginBottom: 14 }}>
            We do not use cookies, tracking pixels, or analytics tools. We do not collect any health or medical data.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>3. Why we collect it</h2>
          <p style={{ marginBottom: 12 }}>
            Your contact form data is used solely to respond to your message. We do not use it for marketing, profiling, or any other purpose.
          </p>
          <p style={{ marginBottom: 14 }}>
            The lawful basis for processing is <strong>legitimate interests</strong> (responding to direct enquiries you have initiated).
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>4. How long we keep your data</h2>
          <p style={{ marginBottom: 14 }}>
            Contact form submissions are delivered to our email inbox and retained only as long as necessary to resolve your enquiry. We do not maintain a separate database of contact form submissions.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>5. Third parties</h2>
          <p style={{ marginBottom: 12 }}>Your data passes through the following third-party services:</p>
          <div style={{ background: "#fff", border: "1.5px solid #e2e6ef", borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
            <table style={{ width: "100%", fontSize: "0.9rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e2e6ef" }}>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "#1a1f2e" }}>Service</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "#1a1f2e" }}>Purpose</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "#1a1f2e" }}>Privacy policy</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e6ef" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 500, color: "#1a1f2e" }}>Vercel</td>
                  <td style={{ padding: "12px 16px" }}>Website hosting</td>
                  <td style={{ padding: "12px 16px" }}><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#0e9f8a" }}>vercel.com</a></td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", fontWeight: 500, color: "#1a1f2e" }}>Zoho Mail</td>
                  <td style={{ padding: "12px 16px" }}>Email delivery</td>
                  <td style={{ padding: "12px 16px" }}><a href="https://www.zoho.com/privacy.html" target="_blank" rel="noopener noreferrer" style={{ color: "#0e9f8a" }}>zoho.com</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginBottom: 14 }}>We do not sell, rent, or share your personal data with any other third parties.</p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>6. Your rights (UK GDPR)</h2>
          <p style={{ marginBottom: 12 }}>Under UK GDPR you have the right to:</p>
          <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
            {[
              ["Access", "request a copy of the data we hold about you"],
              ["Erasure", "ask us to delete your data"],
              ["Rectification", "ask us to correct inaccurate data"],
              ["Restriction", "ask us to limit how we use your data"],
              ["Object", "object to our processing"],
            ].map(([term, desc]) => (
              <li key={term} style={{ marginBottom: 6 }}><strong>{term}</strong> - {desc}</li>
            ))}
          </ul>
          <p style={{ marginBottom: 12 }}>
            To exercise any of these rights, email{" "}
            <a href="mailto:contact@weightlosspricesuk.co.uk" style={{ color: "#0e9f8a" }}>contact@weightlosspricesuk.co.uk</a>.
            We will respond within 2-3 working days.
          </p>
          <p style={{ marginBottom: 14 }}>
            You also have the right to lodge a complaint with the UK&apos;s data protection authority:{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: "#0e9f8a" }}>ico.org.uk</a>.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>7. External links</h2>
          <p style={{ marginBottom: 14 }}>
            This website contains links to third-party provider websites. We are not responsible for their content or privacy practices. Please review each provider&apos;s privacy policy before submitting any personal data to them.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>8. Changes to this policy</h2>
          <p style={{ marginBottom: 14 }}>
            We may update this policy from time to time. The date at the top of this page will always reflect the most recent version.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
