"use client";

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

interface MedCardsProps {
  cheapest: number | null;
}

export default function MedCards({ cheapest }: MedCardsProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginBottom: 56 }}>
      {/* Mounjaro */}
      <a
        href="/mounjaro"
        style={{ background: "#fff", border: "1.5px solid #e2e6ef", borderRadius: 14, padding: "28px 24px 24px", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 1px 3px rgba(15,31,61,0.07)", transition: "border-color 0.18s, box-shadow 0.18s, transform 0.18s" }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "#0e9f8a"; el.style.boxShadow = "0 4px 16px rgba(15,31,61,0.10)"; el.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "#e2e6ef"; el.style.boxShadow = "0 1px 3px rgba(15,31,61,0.07)"; el.style.transform = "none"; }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#e6f7f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>💉</div>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, background: "#e6f7f5", color: "#0e9f8a", border: "1px solid #b2e8e1" }}>● Live</span>
        </div>
        <div>
          <div style={{ fontFamily: SERIF, fontSize: "1.3rem", fontWeight: 400, color: "#0f1f3d", lineHeight: 1.2 }}>Mounjaro</div>
          <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 2 }}>tirzepatide · weekly injection</div>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", lineHeight: 1.5, marginTop: 8, marginBottom: 0 }}>
            A dual-action GIP/GLP-1 injection approved in the UK. Available in doses from 2.5mg to 15mg.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #e2e6ef" }}>
          {cheapest && (
            <div>
              <div style={{ fontSize: "0.7rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.04em" }}>From / month</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#0f1f3d" }}>£{cheapest}</div>
            </div>
          )}
          <div style={{ width: 32, height: 32, background: "#0e9f8a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1rem", marginLeft: "auto" }}>→</div>
        </div>
      </a>

      {/* Wegovy */}
      <div style={{ background: "#fff", border: "1.5px solid #e2e6ef", borderRadius: 14, padding: "28px 24px 24px", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 1px 3px rgba(15,31,61,0.07)", opacity: 0.6, cursor: "default" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#eef0ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>💉</div>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, background: "#eef0f6", color: "#6b7280", border: "1px solid #e2e6ef" }}>Coming soon</span>
        </div>
        <div>
          <div style={{ fontFamily: SERIF, fontSize: "1.3rem", fontWeight: 400, color: "#0f1f3d", lineHeight: 1.2 }}>Wegovy</div>
          <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 2 }}>semaglutide · weekly injection</div>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", lineHeight: 1.5, marginTop: 8, marginBottom: 0 }}>
            A once-weekly GLP-1 injection. Widely available across UK online providers.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #e2e6ef" }}>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.04em" }}>Prices</div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "#6b7280" }}>Coming soon</div>
          </div>
          <div style={{ width: 32, height: 32, background: "#c7d0e8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1rem" }}>→</div>
        </div>
      </div>
    </div>
  );
}
