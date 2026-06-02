"use client";

import { useState } from "react";

export interface Provider {
  name: string;
  brand_url: string | null;
  url: string | null;
  trustpilot_url: string | null;
  price_2_5: number | null;
  price_5: number | null;
  price_7_5: number | null;
  price_10: number | null;
  price_12_5: number | null;
  price_15: number | null;
  discounts: string | null;
  delivery_price: number | null;
  next_day_delivery: boolean | null;
  click_and_collect: boolean | null;
  review_stars: number | null;
  review_count: number | null;
  classification: string | null;
  subscription: boolean | null;
  saving_plans: boolean | null;
  bundles: boolean | null;
  klarna: boolean | null;
  paypal_pay3: boolean | null;
  gphc_number: string | null;
  gphc_registered: boolean | null;
  cqc_registered: boolean | null;
  cqc_rating: string | null;
  confidence: string | null;
}

export type ProviderWithLogo = Provider & { logo: string | null };

type DoseKey = "price_2_5" | "price_5" | "price_7_5" | "price_10" | "price_12_5" | "price_15";

const DOSES: { key: DoseKey; label: string }[] = [
  { key: "price_2_5",  label: "2.5mg" },
  { key: "price_5",    label: "5mg" },
  { key: "price_7_5",  label: "7.5mg" },
  { key: "price_10",   label: "10mg" },
  { key: "price_12_5", label: "12.5mg" },
  { key: "price_15",   label: "15mg" },
];

function getPrice(p: Provider, key: DoseKey): number | null {
  const val = p[key];
  return typeof val === "number" ? val : null;
}

function fmtPrice(price: number): string {
  return price % 1 === 0 ? `£${price}` : `£${price.toFixed(2)}`;
}

function initials(name: string): string {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

const TEAL = "#0e9f8a";
const NAVY = "#0f1f3d";
const MUTED = "#6b7280";
const BORDER = "#e2e6ef";

export default function ProvidersTable({ providers, lastUpdated }: { providers: ProviderWithLogo[]; lastUpdated: string }) {
  const [currentDose, setCurrentDose] = useState<string>("2.5mg");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [allDosesSortKey, setAllDosesSortKey] = useState<DoseKey | null>(null);

  function toggleFilter(key: string) {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  const currentKey = DOSES.find(d => d.label === currentDose)?.key ?? null;
  const isAllDoses = currentDose === "all";

  let rows = providers.filter(p => {
    if (currentKey && getPrice(p, currentKey) == null) return false;
    if (activeFilters.has("cqc") && !p.cqc_registered) return false;
    if (activeFilters.has("sub") && !p.subscription) return false;
    if (activeFilters.has("klarna") && !p.klarna) return false;
    if (activeFilters.has("paypal") && !p.paypal_pay3) return false;
    if (activeFilters.has("highrated") && (p.review_stars == null || p.review_stars < 4.5)) return false;
    return true;
  });

  if (isAllDoses && allDosesSortKey) {
    rows = [...rows].sort((a, b) => (getPrice(a, allDosesSortKey) ?? 9999) - (getPrice(b, allDosesSortKey) ?? 9999));
  } else {
    rows = [...rows].sort((a, b) => {
      const key = currentKey ?? "price_2_5";
      return (getPrice(a, key) ?? 9999) - (getPrice(b, key) ?? 9999);
    });
  }

  const lowestPrice = currentKey && rows.length > 0 ? getPrice(rows[0], currentKey) : null;

  const lowestByDose: Partial<Record<DoseKey, number>> = {};
  for (const d of DOSES) {
    const vals = providers.map(p => getPrice(p, d.key)).filter((v): v is number => v != null);
    if (vals.length) lowestByDose[d.key] = Math.min(...vals);
  }

  return (
    <>
      {/* Sticky dose bar */}
      <div style={{ background: "#ffffff", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 64, zIndex: 150, boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", height: 52, display: "flex", alignItems: "center", gap: 16, overflowX: "auto", scrollbarWidth: "none" } as React.CSSProperties}>
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap", flexShrink: 0 }}>Your dose:</span>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {["all", ...DOSES.map(d => d.label)].map(dose => {
              const active = currentDose === dose;
              return (
                <button
                  key={dose}
                  onClick={() => setCurrentDose(dose)}
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: active ? 600 : 500,
                    padding: "5px 14px",
                    borderRadius: 20,
                    border: `1.5px solid ${active ? TEAL : BORDER}`,
                    background: active ? TEAL : "#ffffff",
                    color: active ? "white" : MUTED,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                    fontFamily: "inherit",
                  }}
                >
                  {dose === "all" ? "All doses" : dose}
                </button>
              );
            })}
          </div>
          <div style={{ width: 1, height: 24, background: BORDER, flexShrink: 0 }} />
          <span style={{ fontSize: "0.8rem", color: MUTED, whiteSpace: "nowrap", flexShrink: 0 }}>
            Showing prices for <strong>{currentDose === "all" ? "all doses" : currentDose}</strong>
          </span>
        </div>
      </div>

      <main style={{ maxWidth: 1140, margin: "0 auto", padding: "28px 24px 80px" }}>

        {/* Explainer strip */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { dot: TEAL, label: "GPhC", desc: "General Pharmaceutical Council — the UK pharmacy regulator. All listed providers must be registered." },
            { dot: "#4338ca", label: "CQC", desc: "Care Quality Commission — regulates clinics and healthcare services. An extra layer of oversight." },
            { dot: "#92580a", label: "Sub", desc: "Subscription available — may reduce your monthly cost. Always check the cancellation terms." },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#ffffff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 14px", fontSize: "0.8rem", flex: 1, minWidth: 180, boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.dot, flexShrink: 0, marginTop: 3 }} />
              <div>
                <strong style={{ color: NAVY, fontSize: "0.82rem" }}>{item.label} </strong>
                <span style={{ color: MUTED, lineHeight: 1.4 }}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.04em" }}>Filter:</span>
          {[
            { key: "cqc", label: "CQC registered" },
            { key: "sub", label: "Subscription" },
            { key: "klarna", label: "Klarna" },
            { key: "paypal", label: "PayPal" },
            { key: "highrated", label: "4.5+ stars" },
          ].map(f => {
            const active = activeFilters.has(f.key);
            return (
              <button
                key={f.key}
                onClick={() => toggleFilter(f.key)}
                style={{
                  fontSize: "0.78rem",
                  fontWeight: active ? 600 : 500,
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: `1.5px solid ${active ? "#b2e8e1" : BORDER}`,
                  background: active ? "#e6f7f5" : "#ffffff",
                  color: active ? TEAL : MUTED,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                }}
              >
                {f.label}
              </button>
            );
          })}
          {!isAllDoses && (
            <>
              <div style={{ width: 1, height: 18, background: BORDER }} />
              <button
                onClick={() => setCurrentDose("all")}
                style={{ fontSize: "0.78rem", fontWeight: 500, padding: "4px 12px", borderRadius: 20, border: `1.5px solid ${BORDER}`, background: "#ffffff", color: MUTED, cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}
              >
                All doses →
              </button>
            </>
          )}
          <div style={{ width: 1, height: 18, background: BORDER }} />
          <button
            onClick={() => setActiveFilters(new Set())}
            style={{ fontSize: "0.75rem", color: MUTED, background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 6, fontFamily: "inherit" }}
          >
            Clear all
          </button>
        </div>

        {/* Table meta */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: "0.82rem", color: MUTED }}>
            <strong style={{ color: NAVY }}>{rows.length}</strong> providers
          </span>
          <span style={{ fontSize: "0.75rem", color: MUTED, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: TEAL, display: "inline-block" }} />
            Updated {lastUpdated}
          </span>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", borderRadius: 14 } as React.CSSProperties}>
          {isAllDoses && (
            <div style={{ fontSize: "0.75rem", color: MUTED, textAlign: "center", padding: "6px 0 8px", letterSpacing: "0.03em" }}>
              ← Swipe to see all doses →
            </div>
          )}
          <div style={{
            background: "#ffffff",
            border: `1.5px solid ${BORDER}`,
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(15,31,61,0.07)",
            minWidth: isAllDoses ? 1060 : 0,
          }}>
            {/* Header */}
            {isAllDoses ? (
              <div style={{ display: "grid", gridTemplateColumns: "160px repeat(6, 85px) 100px 55px 55px 90px", alignItems: "center", padding: "10px 20px", background: NAVY, color: "rgba(255,255,255,0.65)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", gap: 8 }}>
                <div>Provider</div>
                {DOSES.map(d => {
                  const isActive = allDosesSortKey === d.key;
                  return (
                    <div
                      key={d.key}
                      onClick={() => setAllDosesSortKey(isActive ? null : d.key)}
                      style={{ textAlign: "center", fontSize: "0.68rem", cursor: "pointer", padding: "4px 2px", borderRadius: 4, background: isActive ? "rgba(14,159,138,0.35)" : "transparent", color: isActive ? "#7de8d8" : "rgba(255,255,255,0.65)", transition: "background 0.15s", userSelect: "none" } as React.CSSProperties}
                      title={`Sort by ${d.label}`}
                    >
                      {d.label}{isActive ? " ↑" : ""}
                    </div>
                  );
                })}
                <div>Rating</div>
                <div style={{ textAlign: "center" }}>GPhC</div>
                <div style={{ textAlign: "center" }}>CQC</div>
                <div />
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: NAVY, color: "rgba(255,255,255,0.65)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <div>Provider</div>
                <div>Price / mo</div>
              </div>
            )}

            {/* Rows */}
            {rows.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", fontSize: "0.875rem", color: MUTED }}>
                No providers match your filters.{" "}
                <button onClick={() => setActiveFilters(new Set())} style={{ color: TEAL, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}>
                  Clear filters
                </button>
              </div>
            ) : rows.map((p, i) => {
              const isLowest = !isAllDoses && currentKey != null && lowestPrice != null && getPrice(p, currentKey) === lowestPrice;
              const viewUrl = p.url ?? p.brand_url ?? "#";
              const rowStyle: React.CSSProperties = {
                borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : "none",
                padding: "14px 20px",
                gap: 8,
                display: "grid",
              };

              const logoEl = p.logo ? (
                <img src={p.logo} alt={p.name} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${BORDER}`, objectFit: "contain", background: "white", padding: 3, flexShrink: 0 }} />
              ) : (
                <div style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${BORDER}`, background: "#eef0f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: MUTED, flexShrink: 0 }}>
                  {initials(p.name)}
                </div>
              );

              const tagsEl = (
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {p.gphc_registered && <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "1px 6px", borderRadius: 10, background: "#e6f7f5", color: "#0a6b5a" }}>GPhC</span>}
                  {p.cqc_registered && <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "1px 6px", borderRadius: 10, background: "#eef0ff", color: "#4338ca" }}>CQC</span>}
                  {p.subscription && <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "1px 6px", borderRadius: 10, background: "#fff7e0", color: "#92580a" }}>Sub</span>}
                </div>
              );

              const ratingEl = p.review_stars ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: "0.85rem", color: NAVY, fontWeight: 600 }}>★ {p.review_stars.toFixed(1)}</span>
                  <span style={{ fontSize: "0.7rem", color: MUTED }}>{p.review_count?.toLocaleString()} reviews</span>
                </div>
              ) : <span style={{ fontSize: "0.8rem", color: BORDER }}>—</span>;

              const viewBtn = (
                <div style={{ textAlign: "right" }}>
                  <a href={viewUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, background: NAVY, color: "white", fontSize: "0.75rem", fontWeight: 600, padding: "6px 14px", borderRadius: 6, textDecoration: "none", whiteSpace: "nowrap" }}>
                    View →
                  </a>
                </div>
              );

              if (isAllDoses) {
                return (
                  <div key={p.name} style={{ ...rowStyle, gridTemplateColumns: "160px repeat(6, 85px) 100px 55px 55px 90px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {logoEl}
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <a href={viewUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.82rem", fontWeight: 600, color: NAVY, textDecoration: "none" }}>{p.name}</a>
                        {tagsEl}
                      </div>
                    </div>
                    {DOSES.map(d => {
                      const price = getPrice(p, d.key);
                      const isActiveCol = allDosesSortKey === d.key;
                      const isLowestInCol = isActiveCol && price != null && price === lowestByDose[d.key];
                      return price != null ? (
                        <div key={d.key} style={{ textAlign: "center", fontSize: "0.82rem", fontWeight: isActiveCol ? 700 : 600, color: isLowestInCol ? TEAL : isActiveCol ? NAVY : "#1a1f2e", background: isActiveCol ? "rgba(15,31,61,0.04)" : "transparent", borderRadius: 4, padding: "2px 0" }}>
                          {fmtPrice(price)}
                          {isLowestInCol && <div style={{ fontSize: "0.55rem", fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: "0.04em" }}>lowest</div>}
                        </div>
                      ) : (
                        <div key={d.key} style={{ textAlign: "center", fontSize: "0.8rem", color: BORDER, background: isActiveCol ? "rgba(15,31,61,0.04)" : "transparent" }}>—</div>
                      );
                    })}
                    {ratingEl}
                    <div style={{ textAlign: "center", fontSize: "0.85rem" }}>
                      {p.gphc_registered ? <span style={{ color: TEAL, fontWeight: 600 }}>✓</span> : <span style={{ color: BORDER }}>—</span>}
                    </div>
                    <div style={{ textAlign: "center", fontSize: "0.85rem" }}>
                      {p.cqc_registered ? <span style={{ color: TEAL, fontWeight: 600 }}>✓</span> : <span style={{ color: BORDER }}>—</span>}
                    </div>
                    {viewBtn}
                  </div>
                );
              }

              const price = currentKey ? getPrice(p, currentKey) : null;
              return (
                <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : "none", padding: "14px 20px" }}>
                  {/* Provider */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                    {logoEl}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <a href={viewUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.88rem", fontWeight: 600, color: NAVY, textDecoration: "none" }}>{p.name}</a>
                        {isLowest && <span style={{ fontSize: "0.62rem", fontWeight: 700, background: TEAL, color: "white", padding: "2px 6px", borderRadius: 10 }}>Lowest</span>}
                      </div>
                      <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
                        {tagsEl}
                        {p.review_stars && <span style={{ fontSize: "0.72rem", color: MUTED }}>★ {p.review_stars.toFixed(1)}</span>}
                      </div>
                    </div>
                  </div>
                  {/* Price + View */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: isLowest ? TEAL : NAVY }}>
                      {price != null ? fmtPrice(price) : <span style={{ color: BORDER, fontSize: "0.85rem" }}>—</span>}
                    </div>
                    {viewBtn}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ background: "#ffffff", borderLeft: `4px solid ${TEAL}`, padding: "14px 20px", marginTop: 28, display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.8rem", color: MUTED, lineHeight: 1.55 }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: TEAL, flexShrink: 0, marginTop: 1 }}>Important</span>
          <span>Prices are for informational purposes only and may change at any time. Always visit the provider&apos;s website directly to confirm current pricing and eligibility before purchasing. This is not medical advice — always consult a qualified healthcare professional before starting any medication.</span>
        </div>

        {/* Info cards */}
        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          <div style={{ background: "#ffffff", border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: 24, boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
            <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 400, color: NAVY, marginBottom: 10, marginTop: 0 }}>What is Mounjaro?</h3>
            <p style={{ fontSize: "0.85rem", color: MUTED, lineHeight: 1.7, margin: 0 }}>Mounjaro (tirzepatide) is a weekly injection approved in the UK for weight management. It works by mimicking two hormones — GIP and GLP-1 — that regulate appetite and blood sugar. Available in doses from 2.5mg up to 15mg.</p>
          </div>
          <div style={{ background: "#ffffff", border: `1.5px solid ${BORDER}`, borderRadius: 14, padding: 24, boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
            <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 400, color: NAVY, marginBottom: 10, marginTop: 0 }}>How to choose a provider</h3>
            <p style={{ fontSize: "0.85rem", color: MUTED, lineHeight: 1.7, margin: 0 }}>Always look for GPhC-registered pharmacies or CQC-registered clinics. Compare the price at your current dose and your likely long-term dose — they can differ significantly. Check Trustpilot reviews and confirm delivery times directly with the provider.</p>
          </div>
        </div>

      </main>
    </>
  );
}
