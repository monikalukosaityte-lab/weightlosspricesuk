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
  clearpay: boolean | null;
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
    if (activeFilters.has("clearpay") && !p.clearpay) return false;
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
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "10px 24px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Your dose:</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
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
        </div>
      </div>

      <main style={{ width: "100%", maxWidth: 1140, margin: "0 auto", padding: "28px 24px 80px", boxSizing: "border-box" }}>

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
            { key: "paypal", label: "PayPal Pay in 3" },
            { key: "clearpay", label: "Clearpay" },
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

        {/* Sort row — all doses only */}
        {isAllDoses && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.04em" }}>Sort:</span>
            {DOSES.map(d => {
              const isActive = allDosesSortKey === d.key;
              return (
                <button
                  key={d.key}
                  onClick={() => setAllDosesSortKey(isActive ? null : d.key)}
                  style={{ fontSize: "0.78rem", fontWeight: isActive ? 600 : 500, padding: "4px 12px", borderRadius: 20, border: `1.5px solid ${isActive ? "#b2e8e1" : BORDER}`, background: isActive ? "#e6f7f5" : "#ffffff", color: isActive ? TEAL : MUTED, cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}
                >
                  {d.label}{isActive ? " ↑" : ""}
                </button>
              );
            })}
          </div>
        )}

        {/* All-doses table — sticky provider column, price columns scroll */}
        {isAllDoses && (
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", marginLeft: -24, marginRight: -24 } as React.CSSProperties}>
            <table style={{ borderCollapse: "separate", borderSpacing: 0, width: "100%", minWidth: 480, fontSize: "0.82rem" }}>
              <thead>
                <tr style={{ background: NAVY }}>
                  <th style={{ position: "sticky", left: 0, zIndex: 2, background: NAVY, padding: "10px 16px 10px 24px", textAlign: "left", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.65)", whiteSpace: "nowrap", minWidth: 180, borderRight: `1px solid rgba(255,255,255,0.1)` }}>Provider</th>
                  {DOSES.map(d => {
                    const isActive = allDosesSortKey === d.key;
                    return (
                      <th key={d.key} style={{ padding: "10px 12px", textAlign: "center", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: isActive ? "#7de8d8" : "rgba(255,255,255,0.65)", whiteSpace: "nowrap", minWidth: 72 }}>
                        {d.label}{isActive ? " ↑" : ""}
                      </th>
                    );
                  })}
                  <th style={{ padding: "10px 12px", minWidth: 80 }} />
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td colSpan={9} style={{ padding: "40px 20px", textAlign: "center", color: MUTED }}>
                    No providers match your filters.{" "}
                    <button onClick={() => setActiveFilters(new Set())} style={{ color: TEAL, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}>Clear filters</button>
                  </td></tr>
                ) : rows.map((p, i) => {
                  const viewUrl = p.url ?? p.brand_url ?? "#";
                  const rowBg = i % 2 === 0 ? "#ffffff" : "#fafbfc";
                  const borderB = i < rows.length - 1 ? `1px solid ${BORDER}` : "none";
                  const logoEl = p.logo ? (
                    <img src={p.logo} alt={p.name} style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${BORDER}`, objectFit: "contain", background: "white", padding: 2, flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${BORDER}`, background: "#eef0f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, color: MUTED, flexShrink: 0 }}>{initials(p.name)}</div>
                  );
                  return (
                    <tr key={p.name}>
                      <td style={{ position: "sticky", left: 0, zIndex: 1, background: rowBg, borderBottom: borderB, borderRight: `1px solid ${BORDER}`, padding: "10px 12px 10px 24px", minWidth: 180 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {logoEl}
                          <div>
                            <a href={viewUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.82rem", fontWeight: 600, color: NAVY, textDecoration: "none" }}>{p.name}</a>
                            <div style={{ display: "flex", gap: 3, marginTop: 3, flexWrap: "wrap" }}>
                              {p.gphc_registered && <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "1px 5px", borderRadius: 8, background: "#e6f7f5", color: "#0a6b5a" }}>GPhC</span>}
                              {p.cqc_registered && <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "1px 5px", borderRadius: 8, background: "#eef0ff", color: "#4338ca" }}>CQC</span>}
                              {p.subscription && <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "1px 5px", borderRadius: 8, background: "#fff7e0", color: "#92580a" }}>Sub</span>}
                              {p.klarna && <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "1px 5px", borderRadius: 8, background: "#ffffff", color: MUTED, border: `1px solid ${BORDER}` }}>Klarna</span>}
                              {p.paypal_pay3 && <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "1px 5px", borderRadius: 8, background: "#ffffff", color: MUTED, border: `1px solid ${BORDER}` }}>PayPal Pay in 3</span>}
                              {p.clearpay && <span style={{ fontSize: "0.6rem", fontWeight: 600, padding: "1px 5px", borderRadius: 8, background: "#ffffff", color: MUTED, border: `1px solid ${BORDER}` }}>Clearpay</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      {DOSES.map(d => {
                        const price = getPrice(p, d.key);
                        const isActiveCol = allDosesSortKey === d.key;
                        const isLowestInCol = price != null && price === lowestByDose[d.key];
                        return (
                          <td key={d.key} style={{ textAlign: "center", padding: "10px 8px", borderBottom: borderB, background: isActiveCol ? "rgba(15,31,61,0.03)" : rowBg, fontWeight: isLowestInCol ? 700 : 500, color: isLowestInCol ? TEAL : NAVY, whiteSpace: "nowrap" }}>
                            {price != null ? fmtPrice(price) : <span style={{ color: BORDER }}>—</span>}
                          </td>
                        );
                      })}
                      <td style={{ padding: "10px 12px", borderBottom: borderB, textAlign: "right", background: rowBg, whiteSpace: "nowrap" }}>
                        <a href={viewUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, background: NAVY, color: "white", fontSize: "0.72rem", fontWeight: 600, padding: "5px 12px", borderRadius: 6, textDecoration: "none" }}>View →</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Single-dose table */}
        {!isAllDoses && (
          <div style={{ borderRadius: 14, border: `1.5px solid ${BORDER}`, overflow: "hidden", boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: NAVY, color: "rgba(255,255,255,0.65)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <div>Provider</div>
              <div>Price / mo</div>
            </div>
        {rows.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", fontSize: "0.875rem", color: MUTED }}>
                No providers match your filters.{" "}
                <button onClick={() => setActiveFilters(new Set())} style={{ color: TEAL, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}>
                  Clear filters
                </button>
              </div>
            ) : rows.map((p, i) => {
              const isLowest = currentKey != null && lowestPrice != null && getPrice(p, currentKey) === lowestPrice;
              const viewUrl = p.url ?? p.brand_url ?? "#";

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
                  {p.klarna && <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "1px 6px", borderRadius: 10, background: "#ffffff", color: MUTED, border: `1px solid ${BORDER}` }}>Klarna</span>}
                  {p.paypal_pay3 && <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "1px 6px", borderRadius: 10, background: "#ffffff", color: MUTED, border: `1px solid ${BORDER}` }}>PayPal Pay in 3</span>}
                  {p.clearpay && <span style={{ fontSize: "0.62rem", fontWeight: 600, padding: "1px 6px", borderRadius: 10, background: "#ffffff", color: MUTED, border: `1px solid ${BORDER}` }}>Clearpay</span>}
                </div>
              );

              const viewBtn = (
                <div style={{ textAlign: "right" }}>
                  <a href={viewUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, background: NAVY, color: "white", fontSize: "0.75rem", fontWeight: 600, padding: "6px 14px", borderRadius: 6, textDecoration: "none", whiteSpace: "nowrap" }}>
                    View →
                  </a>
                </div>
              );

              const price = currentKey ? getPrice(p, currentKey) : null;
              return (
                <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : "none", padding: "14px 20px" }}>
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
        )}

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
