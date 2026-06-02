"use client";

import { useState } from "react";
import NavBar from "../NavBar";

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
  const [lastName, setLastName] = useState("")
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

  return (
    <div className="min-h-screen bg-[#F4F8FD]">
      <NavBar maxWidth="max-w-3xl" />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h1>

        {/* Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            This form is for provider listing enquiries only.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            We are a price comparison website — not a clinic, pharmacy, or medication provider.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            We cannot answer questions about treatment, dosage, side effects, suitability, or weight loss. Medication-related messages will not be answered.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            For medical advice, please contact your GP, medication provider, or pharmacy — or visit{" "}
            <a
              href="https://www.nhs.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-900"
            >
              NHS.uk →
            </a>
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="text-3xl mb-3">✓</div>
            <h2 className="text-lg font-semibold text-green-800 mb-1">Message sent</h2>
            <p className="text-sm text-green-700">
              Thanks for getting in touch. We&apos;ll get back to you at {email}.
            </p>
            <button
              onClick={() => { setStatus("idle"); setFirstName(""); setLastName(""); setEmail(""); setReason(""); setMessage(""); setPrivacy(false); }}
              className="mt-5 text-sm text-green-700 underline hover:text-green-900"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-6">

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7FD4] focus:border-transparent"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7FD4] focus:border-transparent"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7FD4] focus:border-transparent"
                placeholder="you@example.com"
              />
              <p className="text-xs text-gray-400 mt-1">
                We&apos;ll only use your email to respond to your message.
              </p>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for contact <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={reason}
                onChange={e => setReason(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7FD4] focus:border-transparent bg-white"
              >
                <option value="">Select a reason…</option>
                {REASONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7FD4] focus:border-transparent resize-none"
                placeholder="Tell us more…"
              />
            </div>

            {/* Privacy checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacy"
                required
                checked={privacy}
                onChange={e => setPrivacy(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#2F7FD4] focus:ring-[#2F7FD4] flex-shrink-0"
              />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                I agree my email is used only to reply to me
              </label>
            </div>

            {/* Error */}
            {status === "error" && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending" || !privacy}
              className="w-full bg-[#2F7FD4] text-white font-semibold py-3 rounded-lg hover:bg-[#2571bc] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>

      <footer className="bg-[#0D2D4F] py-6 px-4 text-center text-xs mt-10" style={{ borderTop: "1px solid #1a3a5c" }}>
        <span style={{ color: "#7AABCE" }}>WeightLossPricesUK.co.uk — For informational purposes only. Not medical advice.</span>
        <span style={{ color: "#1a3a5c" }} className="mx-2">·</span>
        <a href="/privacy" style={{ color: "#7AABCE" }} className="underline hover:text-white transition-colors">Privacy Policy</a>
      </footer>
    </div>
  );
}
