import { readFileSync, statSync } from "fs";
import { join } from "path";
import NavBar from "./NavBar";
import Footer from "./Footer";
import FAQAccordion from "./FAQAccordion";
import MedCards from "./MedCards";

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

function loadStats() {
  const raw = readFileSync(join(process.cwd(), "data/providers.json"), "utf-8");
  const providers = JSON.parse(raw) as Array<{ price_2_5?: number | null }>;
  const prices = providers.map(p => p.price_2_5).filter((v): v is number => v != null);
  const cheapest = prices.length ? Math.min(...prices) : null;
  const lastUpdated = statSync(join(process.cwd(), "data/providers.json")).mtime
    .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return { count: providers.length, cheapest, lastUpdated };
}

export default function HomePage() {
  const { count, cheapest, lastUpdated } = loadStats();

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", display: "flex", flexDirection: "column" }}>
      <NavBar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, #0f1f3d 0%, #1a3260 60%, #1e4d8c 100%)", color: "white", padding: "64px 24px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%, rgba(14,159,138,0.18) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(14,159,138,0.18)", border: "1px solid rgba(14,159,138,0.35)", color: "#7de8d8", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "#0e9f8a", borderRadius: "50%", display: "inline-block" }} />
            Independent &amp; up to date
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 400, lineHeight: 1.2, maxWidth: 640, marginBottom: 16 }}>
            Compare weight loss medication prices{" "}
            <span style={{ color: "#7de8d8" }}>across the UK</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", maxWidth: 520, lineHeight: 1.6, marginBottom: 40 }}>
            See what UK-registered online providers are charging for Mounjaro and Wegovy &ndash; all in one place, updated daily.
          </p>
          <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <strong style={{ fontSize: "1.55rem", fontWeight: 600, color: "white", lineHeight: 1 }}>{count}+</strong>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Providers tracked</span>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.15)", height: 40, alignSelf: "center" }} />
            {cheapest && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <strong style={{ fontSize: "1.55rem", fontWeight: 600, color: "white", lineHeight: 1 }}>£{cheapest}</strong>
                  <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Lowest Mounjaro 2.5mg</span>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.15)", height: 40, alignSelf: "center" }} />
              </>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <strong style={{ fontSize: "1.55rem", fontWeight: 600, color: "white", lineHeight: 1 }}>Daily</strong>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Price updates</span>
            </div>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1140, margin: "0 auto", padding: "48px 24px 80px", flex: 1, width: "100%" }}>

        {/* Medication cards */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 400, color: "#0f1f3d" }}>Choose a medication</h2>
          <span style={{ fontSize: "0.8rem", color: "#6b7280", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
            Prices updated {lastUpdated}
          </span>
        </div>

        <MedCards cheapest={cheapest} />

        {/* Disclaimer */}
        <div style={{ background: "#fff", borderLeft: "4px solid #0e9f8a", padding: "14px 20px", fontSize: "0.8rem", color: "#6b7280", display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 56, lineHeight: 1.55 }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0e9f8a", flexShrink: 0, marginTop: 1 }}>Important</span>
          <span>Prices are for informational purposes only and may be out of date or subject to change. Always visit the provider&apos;s website to confirm current pricing. This is not medical advice &ndash; consult a qualified healthcare professional before starting any medication.</span>
        </div>

        {/* How it works */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 400, color: "#0f1f3d", marginBottom: 20 }}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { n: "1", title: "Choose your medication", body: "Pick from Mounjaro or Wegovy to see all UK provider prices in one place." },
              { n: "2", title: "Filter by dose & plan", body: "Select your dose, filter by subscription, payment method, or compliance - GPhC & CQC registered only." },
              { n: "3", title: "Compare & click through", body: "See star ratings, Trustpilot reviews and payment options at a glance. Click directly to the provider to find out more and order." },
              { n: "4", title: "Always confirm before purchasing", body: "Prices can change at any time. Always visit the provider's website directly to confirm the current price and eligibility before placing an order." },
            ].map(step => (
              <div key={step.n} style={{ background: "#fff", border: "1.5px solid #e2e6ef", borderRadius: 14, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#e6f7f5", color: "#0e9f8a", fontWeight: 700, fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{step.n}</div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#0f1f3d" }}>{step.title}</h3>
                <p style={{ fontSize: "0.83rem", color: "#6b7280", lineHeight: 1.55, margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <FAQAccordion />

      </main>

      <Footer />
    </div>
  );
}
