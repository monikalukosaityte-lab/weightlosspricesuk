"use client";

import { useState } from "react";

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

const FAQS = [
  {
    q: "Is it safe to buy weight loss medication online in the UK?",
    a: "Yes - if the provider is registered with the GPhC (pharmacy regulator) or CQC (clinic regulator), and prescribers are GMC-registered. All providers listed on this site meet those requirements. Always verify directly on the provider's website.",
  },
  {
    q: "How do I choose the right provider?",
    a: "Look for GPhC or CQC registration, check Trustpilot reviews, compare prices at your dose, and check whether they offer subscriptions or bundles to save money long-term. Delivery speed and support quality also matter.",
  },
  {
    q: "How often are prices updated?",
    a: "We update prices daily by checking each provider's website. However, prices can change at any time without notice, so always confirm the current price on the provider's site before ordering.",
  },
  {
    q: "Why do prices vary so much between providers?",
    a: "Providers set their own pricing and may offer introductory discounts, subscription rates, or bundle deals. As your dose increases over time, prices can differ significantly between providers - which is exactly why comparing them matters.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ marginBottom: 56 }}>
      <h2 style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 400, color: "#0f1f3d", marginBottom: 20 }}>
        Common questions
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            style={{ background: "#fff", border: "1.5px solid #e2e6ef", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", fontFamily: "inherit", fontSize: "0.92rem", fontWeight: 600, color: "#0f1f3d" }}
            >
              {faq.q}
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: open === i ? "#e6f7f5" : "#eef0f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform 0.22s, background 0.18s", transform: open === i ? "rotate(180deg)" : "none", color: open === i ? "#0e9f8a" : "#6b7280", fontSize: "0.75rem" }}>
                ▾
              </span>
            </button>
            {open === i && (
              <div style={{ padding: "0 20px 18px", paddingTop: 14, fontSize: "0.86rem", color: "#6b7280", lineHeight: 1.65, borderTop: "1px solid #e2e6ef" }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
