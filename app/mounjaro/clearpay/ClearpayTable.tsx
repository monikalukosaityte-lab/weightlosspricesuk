"use client";

import { useState } from "react";
import { type ProviderWithLogo } from "../../ProvidersTable";

type DoseKey = "price_2_5" | "price_5" | "price_7_5" | "price_10" | "price_12_5" | "price_15";

const DOSES: { key: DoseKey; label: string }[] = [
  { key: "price_2_5",  label: "2.5mg" },
  { key: "price_5",    label: "5mg" },
  { key: "price_7_5",  label: "7.5mg" },
  { key: "price_10",   label: "10mg" },
  { key: "price_12_5", label: "12.5mg" },
  { key: "price_15",   label: "15mg" },
];

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";
const TEAL  = "#0e9f8a";
const NAVY  = "#0f1f3d";
const MUTED = "#6b7280";
const BORDER = "#e2e6ef";

function fmtPrice(p: number) { return p % 1 === 0 ? `£${p}` : `£${p.toFixed(2)}`; }
function initials(n: string) { return n.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase(); }

const FAQS = [
  { q: "Which UK providers offer Mounjaro with Clearpay?", a: "Based on our research, providers including Swift Doctor, Pharmacy Express, Peak Pharmacy, Oushk Pharmacy, The Family Chemist and Simply Meds Online have listed Clearpay as a payment option. Availability can change at any time - always confirm directly on the provider's website before ordering." },
  { q: "Is Clearpay available for all Mounjaro doses?", a: "Clearpay availability can vary depending on the dose and the total order value. Some providers may only offer Clearpay above a certain spend threshold. Always check the provider's checkout directly to confirm whether Clearpay is available for your specific dose." },
  { q: "Can I use Clearpay Pay in 3 for Mounjaro?", a: "Some providers support Clearpay Pay in 3, while others may offer different Clearpay options such as Pay Later. The specific Clearpay products available will depend on the individual provider and your Clearpay account status. Check the provider's payment page for details." },
  { q: "Are there other buy-now-pay-later options for Mounjaro?", a: "Yes - some providers also accept Klarna and PayPal Pay in 3. You can filter by payment option on our main Mounjaro comparison page to find what suits you." },
];

export default function ClearpayTable({ providers, lastUpdated }: { providers: ProviderWithLogo[]; lastUpdated: string }) {
  const [currentDose, setCurrentDose] = useState<DoseKey>("price_2_5");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const rows = [...providers]
    .filter(p => p[currentDose] != null)
    .sort((a, b) => ((a[currentDose] as number) ?? 9999) - ((b[currentDose] as number) ?? 9999));

  const lowestPrice = rows.length > 0 ? (rows[0][currentDose] as number) : null;

  return (
    <>
      {/* Sticky dose bar */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 64, zIndex: 150, boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "10px 24px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Your dose:</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {DOSES.map(d => {
              const active = currentDose === d.key;
              return (
                <button key={d.key} onClick={() => setCurrentDose(d.key)} style={{ fontSize: "0.82rem", fontWeight: active ? 600 : 500, padding: "5px 14px", borderRadius: 20, border: `1.5px solid ${active ? TEAL : BORDER}`, background: active ? TEAL : "#fff", color: active ? "white" : MUTED, cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap", fontFamily: "inherit" }}>
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main style={{ width: "100%", maxWidth: 1140, margin: "0 auto", padding: "28px 24px 80px", boxSizing: "border-box" }}>

        <a href="/mounjaro" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: MUTED, textDecoration: "none", marginBottom: 20 }}>
          Back to all Mounjaro providers
        </a>

        {/* Notice */}
        <div style={{ background: "#fff", borderLeft: `4px solid ${TEAL}`, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.82rem", color: MUTED, lineHeight: 1.6 }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: TEAL, flexShrink: 0, marginTop: 2 }}>Please note</span>
          <span>Clearpay availability shown here is based on publicly available information and may change at any time. Always visit the provider&apos;s website directly to confirm whether Clearpay is currently accepted and whether you are eligible before placing an order.</span>
        </div>

        {/* Table meta */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: "0.82rem", color: MUTED }}><strong style={{ color: NAVY }}>{rows.length}</strong> providers offering Clearpay</span>
          <span style={{ fontSize: "0.75rem", color: MUTED, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: TEAL, display: "inline-block" }} />
            Updated {lastUpdated}
          </span>
        </div>

        {/* Provider list */}
        <div style={{ borderRadius: 14, border: `1.5px solid ${BORDER}`, overflow: "hidden", boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: NAVY, color: "rgba(255,255,255,0.65)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <div>Provider</div>
            <div>Price / mo</div>
          </div>
          {rows.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center", fontSize: "0.875rem", color: MUTED }}>
              No providers have prices for this dose yet.
            </div>
          ) : rows.map((p, i) => {
            const price = p[currentDose] as number;
            const isLowest = price === lowestPrice;
            const viewUrl = p.url ?? p.brand_url ?? "#";
            const logoEl = p.logo
              ? <img src={p.logo} alt={p.name} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${BORDER}`, objectFit: "contain", background: "white", padding: 3, flexShrink: 0 }} />
              : <div style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${BORDER}`, background: "#eef0f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: MUTED, flexShrink: 0 }}>{initials(p.name)}</div>;
            return (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : "none", padding: "14px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                  {logoEl}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <a href={viewUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.88rem", fontWeight: 600, color: NAVY, textDecoration: "none" }}>{p.name}</a>
                      {isLowest && <span style={{ fontSize: "0.62rem", fontWeight: 700, background: TEAL, color: "white", padding: "2px 6px", borderRadius: 10 }}>Lowest</span>}
                    </div>
                    <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
                      {p.gphc_registered && <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "1px 6px", borderRadius: 10, background: "#e6f7f5", color: "#0a6b5a" }}>GPhC</span>}
                      {p.cqc_registered && <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "1px 6px", borderRadius: 10, background: "#eef0ff", color: "#4338ca" }}>CQC</span>}
                      <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "1px 6px", borderRadius: 10, background: "#e6f9f0", color: "#047857" }}>Clearpay</span>
                      {p.review_stars && <span style={{ fontSize: "0.72rem", color: MUTED }}>★ {p.review_stars.toFixed(1)}{p.review_count ? ` (${p.review_count.toLocaleString()})` : ""}</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: isLowest ? TEAL : NAVY }}>{fmtPrice(price)}</div>
                  <a href={viewUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, background: NAVY, color: "white", fontSize: "0.75rem", fontWeight: 600, padding: "6px 14px", borderRadius: 6, textDecoration: "none", whiteSpace: "nowrap" }}>View</a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div style={{ background: "#fff", borderLeft: `4px solid ${TEAL}`, padding: "14px 20px", marginTop: 28, display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.8rem", color: MUTED, lineHeight: 1.55 }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: TEAL, flexShrink: 0, marginTop: 1 }}>Important</span>
          <span>Prices are for informational purposes only and may change at any time. Clearpay availability is not guaranteed - always confirm directly with the provider before ordering. This is not medical advice - always consult a qualified healthcare professional before starting any medication.</span>
        </div>

        {/* Info cards */}
        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          <div style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: 24, boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
            <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 400, color: NAVY, marginBottom: 10, marginTop: 0 }}>Checking Clearpay eligibility</h3>
            <p style={{ fontSize: "0.85rem", color: MUTED, lineHeight: 1.7, margin: 0 }}>Clearpay availability can vary by provider, dose, and order value. It may also depend on your personal Clearpay account status. Always check the provider&apos;s checkout process directly to confirm Clearpay is available for your specific order before committing.</p>
          </div>
          <div style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: 24, boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
            <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 400, color: NAVY, marginBottom: 10, marginTop: 0 }}>Looking at all providers?</h3>
            <p style={{ fontSize: "0.85rem", color: MUTED, lineHeight: 1.7, margin: 0 }}>This page only shows providers that list Clearpay as a payment option. To compare all UK Mounjaro providers - including those offering Klarna, PayPal, subscription discounts, or standard card payment - visit the full comparison page.</p>
            <a href="/mounjaro" style={{ display: "inline-block", marginTop: 14, background: TEAL, color: "white", fontSize: "0.82rem", fontWeight: 600, padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>View all providers</a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 400, color: NAVY, marginBottom: 16 }}>Common questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", fontFamily: "inherit", fontSize: "0.92rem", fontWeight: 600, color: NAVY }}>
                  {faq.q}
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: openFaq === i ? "#e6f9f0" : "#eef0f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform 0.22s, background 0.18s", transform: openFaq === i ? "rotate(180deg)" : "none", color: openFaq === i ? "#047857" : MUTED, fontSize: "0.75rem" }}>▾</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px", paddingTop: 14, fontSize: "0.86rem", color: MUTED, lineHeight: 1.65, borderTop: `1px solid ${BORDER}` }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  );
}
