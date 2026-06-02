import NavBar from "../NavBar";
import Footer from "../Footer";

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", display: "flex", flexDirection: "column" }}>
      <NavBar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, #0f1f3d 0%, #1a3260 60%, #1e4d8c 100%)", color: "white", padding: "64px 24px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%, rgba(14,159,138,0.18) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(14,159,138,0.18)", border: "1px solid rgba(14,159,138,0.35)", color: "#7de8d8", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 20 }}>
            About us
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 400, lineHeight: 1.2, maxWidth: 580, marginBottom: 16 }}>
            We built the site we wished existed
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", maxWidth: 520, lineHeight: 1.6 }}>
            Weight loss medications in the UK should not feel like a maze. We&apos;re here to make the pricing clear, honest, and easy to understand.
          </p>
        </div>
      </section>

      <main style={{ maxWidth: 780, margin: "0 auto", padding: "56px 24px 80px", flex: 1, width: "100%" }}>

        {/* Mission */}
        <div style={{ background: "#fff", border: "1.5px solid #e2e6ef", borderRadius: 14, padding: "36px 32px", marginBottom: 40, boxShadow: "0 1px 3px rgba(15,31,61,0.07)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#0e9f8a" }} />
          <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0e9f8a", marginBottom: 12 }}>Our mission</div>
          <p style={{ fontSize: "1.05rem", color: "#1a1f2e", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
            The UK weight loss medication market has exploded. There are now dozens of online providers &ndash; each with different prices, different dose options, different subscription models, and different small print. It&apos;s genuinely confusing, even for people who know what they&apos;re looking for.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#1a1f2e", lineHeight: 1.75, fontWeight: 300, marginTop: 14, marginBottom: 0 }}>
            We built WeightLossPricesUK because we felt people deserved a simple, honest place to see what things actually cost &ndash; before committing to anything. Not after the first invoice arrives.
          </p>
        </div>

        {/* The problem */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 400, color: "#0f1f3d", marginBottom: 14 }}>The problem we&apos;re solving</h2>
          <p style={{ fontSize: "0.92rem", color: "#6b7280", lineHeight: 1.75, marginBottom: 12 }}>
            The price you see advertised is not always the price you&apos;ll pay long term. Many providers offer attractive first-order discounts to get you through the door &ndash; but once you move to your second or third month, the price can increase significantly.
          </p>
          <p style={{ fontSize: "0.92rem", color: "#6b7280", lineHeight: 1.75, marginBottom: 20 }}>
            On top of that, some providers charge differently depending on your dose, whether you subscribe, or whether you pay upfront. Without comparing them side by side, it&apos;s almost impossible to know if you&apos;re getting a fair deal.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { title: "Introductory pricing", body: "Many providers heavily discount your first order. The real ongoing cost can be much higher." },
              { title: "Dose price jumps", body: "As your dose increases over time, so does the price &ndash; sometimes by £100+ per month." },
              { title: "Subscription lock-in", body: "Some plans look cheaper but require long-term commitments with cancellation restrictions." },
            ].map(card => (
              <div key={card.title} style={{ background: "#fff", border: "1.5px solid #e2e6ef", borderRadius: 8, padding: 20, boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0f1f3d", marginBottom: 6 }}>{card.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.6, margin: 0 }} dangerouslySetInnerHTML={{ __html: card.body }} />
              </div>
            ))}
          </div>
        </section>

        {/* What we do */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 400, color: "#0f1f3d", marginBottom: 14 }}>What we do</h2>
          <p style={{ fontSize: "0.92rem", color: "#6b7280", lineHeight: 1.75, marginBottom: 12 }}>
            We collect publicly available pricing from UK-registered online providers and display it in one place, updated daily. We show prices across all available doses so you can compare like for like &ndash; not just the cheapest headline figure.
          </p>
          <p style={{ fontSize: "0.92rem", color: "#6b7280", lineHeight: 1.75, margin: 0 }}>
            We also show you which providers are GPhC-registered, CQC-registered, their Trustpilot ratings, and what payment options they accept &ndash; so you have the full picture before you click through.
          </p>
        </section>

        {/* What we are not */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 400, color: "#0f1f3d", marginBottom: 14 }}>What we are not</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "We are not a pharmacy, clinic, or medication provider",
              "We do not sell, prescribe, or dispense any medications",
              "We do not provide medical advice of any kind",
              "We are not paid by providers to influence their ranking or position",
            ].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1.5px solid #e2e6ef", borderRadius: 8, padding: "14px 18px", fontSize: "0.88rem", color: "#6b7280", boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
                <div style={{ width: 22, height: 22, background: "#fdecea", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#c0392b", flexShrink: 0, fontWeight: 700 }}>✕</div>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Independence */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 400, color: "#0f1f3d", marginBottom: 14 }}>Our independence</h2>
          <p style={{ fontSize: "0.92rem", color: "#6b7280", lineHeight: 1.75, margin: 0 }}>
            Rankings and listings on this site are based purely on data &ndash; price, dose availability, and provider completeness. No provider pays us to appear higher or be featured. That independence is something we take seriously, because the moment that changes, the site stops being useful to you.
          </p>
        </section>

        {/* CTA */}
        <div style={{ background: "#e6f7f5", borderLeft: "4px solid #0e9f8a", padding: "20px 24px", marginTop: 40 }}>
          <p style={{ fontSize: "0.88rem", color: "#0a6b5a", lineHeight: 1.65, marginBottom: 12 }}>
            Found an incorrect price, a missing provider, or a broken link? We rely on people flagging these things to keep the data as accurate as possible.
          </p>
          <a href="/contact" style={{ display: "inline-block", background: "#0e9f8a", color: "white", fontSize: "0.85rem", fontWeight: 600, padding: "10px 20px", borderRadius: 8, textDecoration: "none" }}>
            Get in touch →
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
