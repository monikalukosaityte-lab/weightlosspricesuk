"use client";

import { useState } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

const REASONS = [
  "Report an incorrect price",
  "Suggest a missing provider",
  "Report a broken link",
  "Report a provider as closed / scam",
  "Something else",
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!privacy) return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, reason, message }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Could not send message. Please try again.");
      setStatus("error");
    }
  }

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #e2e6ef",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    outline: "none",
    background: "#fff",
    color: "#1a1f2e",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", display: "flex", flexDirection: "column" }}>
      <NavBar />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px", flex: 1, width: "100%" }}>
        <h1 style={{ fontFamily: SERIF, fontSize: "2rem", fontWeight: 400, color: "#0f1f3d", marginBottom: 32 }}>
          Contact us
        </h1>

        {/* Disclaimer */}
        <div style={{ background: "#e6f7f5", borderLeft: "4px solid #0e9f8a", padding: "16px 20px", marginBottom: 32 }}>
          <p style={{ fontSize: "0.88rem", color: "#0a6b5a", fontWeight: 600, marginBottom: 6, lineHeight: 1.5 }}>
            This form is for provider listing enquiries only.
          </p>
          <p style={{ fontSize: "0.85rem", color: "#0a6b5a", lineHeight: 1.6, marginBottom: 8 }}>
            We are a price comparison website - not a clinic, pharmacy, or medication provider. We cannot answer questions about treatment, dosage, side effects, or suitability.
          </p>
          <p style={{ fontSize: "0.85rem", color: "#0a6b5a", lineHeight: 1.6, margin: 0 }}>
            For medical advice, please contact your GP or visit{" "}
            <a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer" style={{ color: "#0a6b5a", fontWeight: 600 }}>NHS.uk</a>.
          </p>
        </div>

        {status === "success" ? (
          <div style={{ background: "#e6f7f5", border: "1.5px solid #b2e8e1", borderRadius: 14, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: 12, color: "#0e9f8a" }}>✓</div>
            <h2 style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 400, color: "#0f1f3d", marginBottom: 8 }}>Message sent</h2>
            <p style={{ fontSize: "0.9rem", color: "#0a6b5a", marginBottom: 20 }}>
              Thanks for getting in touch. We&apos;ll get back to you at {email}.
            </p>
            <button
              onClick={() => { setStatus("idle"); setFirstName(""); setLastName(""); setEmail(""); setReason(""); setMessage(""); setPrivacy(false); }}
              style={{ fontSize: "0.85rem", color: "#0e9f8a", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1.5px solid #e2e6ef", borderRadius: 14, boxShadow: "0 1px 3px rgba(15,31,61,0.07)", padding: "32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, color: "#1a1f2e", marginBottom: 6 }}>
                  First name <span style={{ color: "#e84c4c" }}>*</span>
                </label>
                <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} placeholder="First name" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, color: "#1a1f2e", marginBottom: 6 }}>
                  Last name <span style={{ color: "#e84c4c" }}>*</span>
                </label>
                <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} placeholder="Last name" />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, color: "#1a1f2e", marginBottom: 6 }}>
                Email address <span style={{ color: "#e84c4c" }}>*</span>
              </label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="you@example.com" />
              <p style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 4 }}>We&apos;ll only use your email to respond to your message.</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, color: "#1a1f2e", marginBottom: 6 }}>
                Reason for contact <span style={{ color: "#e84c4c" }}>*</span>
              </label>
              <select required value={reason} onChange={e => setReason(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="">Select a reason...</option>
                {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, color: "#1a1f2e", marginBottom: 6 }}>Message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} style={{ ...inputStyle, resize: "none" }} placeholder="Tell us more..." />
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24 }}>
              <input
                type="checkbox"
                id="privacy"
                required
                checked={privacy}
                onChange={e => setPrivacy(e.target.checked)}
                style={{ marginTop: 3, flexShrink: 0, accentColor: "#0e9f8a" }}
              />
              <label htmlFor="privacy" style={{ fontSize: "0.85rem", color: "#6b7280", cursor: "pointer" }}>
                I agree my email is used only to reply to me
              </label>
            </div>

            {status === "error" && (
              <p style={{ fontSize: "0.85rem", color: "#e84c4c", background: "#fdecea", border: "1px solid #f5b7b1", borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending" || !privacy}
              style={{ width: "100%", background: privacy && status !== "sending" ? "#0e9f8a" : "#d1d5db", color: "white", fontWeight: 600, padding: "12px 20px", borderRadius: 8, border: "none", cursor: privacy && status !== "sending" ? "pointer" : "not-allowed", fontSize: "0.9rem", fontFamily: "inherit", transition: "background 0.15s" }}
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
