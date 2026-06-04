const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

export default function Footer() {
  return (
    <footer style={{ background: "#0f1f3d", color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", lineHeight: 1.7 }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 24px 32px" }}>

        {/* Top: brand + link columns */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: SERIF, fontSize: "1.1rem", color: "white" }}>
              WeightLossPrices<span style={{ color: "#0e9f8a" }}>UK</span>
            </span>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", maxWidth: 280, lineHeight: 1.55, margin: 0 }}>
              Independent price comparisons for UK weight loss medications. Updated daily.
            </p>
          </div>

          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <strong style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
                Site
              </strong>
              {([["Home", "/"], ["About", "/about"], ["Contact", "/contact"]] as const).map(([label, href]) => (
                <a key={href} href={href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.82rem" }}>
                  {label}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <strong style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
                Medications
              </strong>
              <a href="/mounjaro" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.82rem" }}>
                Mounjaro
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: copyright + legal links */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>
            &copy; 2026 WeightLossPricesUK. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {([["Privacy", "/privacy"], ["Terms", "/terms"]] as const).map(([label, href]) => (
              <a key={href} href={href} style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.6, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: 20, marginBottom: 0 }}>
          Prices shown are for informational purposes only and may change at any time. Always visit the
          provider&apos;s website directly to confirm current pricing and eligibility. WeightLossPricesUK does not
          provide medical advice. Always consult a qualified healthcare professional before starting any weight
          loss medication.
        </p>
      </div>
    </footer>
  );
}
