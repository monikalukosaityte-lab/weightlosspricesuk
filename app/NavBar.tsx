"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

function LogoIcon() {
  return (
    <div style={{ width: 36, height: 36, background: "#0e9f8a", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <line x1="8" y1="4" x2="8" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <polyline points="3,11 8,17 13,11" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="19" y="9" fontFamily="Georgia,serif" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">£</text>
      </svg>
    </div>
  );
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function navLinkStyle(href: string) {
    return {
      fontSize: "0.88rem",
      fontWeight: 500 as const,
      color: pathname === href ? "#0f1f3d" : "#6b7280",
      textDecoration: "none",
      padding: "6px 12px",
      borderRadius: 8,
    };
  }

  return (
    <header style={{ background: "#ffffff", borderBottom: "1px solid #e2e6ef", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 3px rgba(15,31,61,0.07)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <LogoIcon />
          <span style={{ fontFamily: SERIF, fontSize: "1.15rem", color: "#0f1f3d" }}>
            WeightLossPrices<span style={{ color: "#0e9f8a" }}>UK</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex" style={{ alignItems: "center", gap: 2, marginLeft: "auto" }}>
          <a href="/mounjaro" style={{ ...navLinkStyle("/mounjaro"), display: "flex", alignItems: "center", gap: 5 }}>
            Mounjaro
            <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.04em", padding: "1px 6px", borderRadius: 10, background: "#e6f7f5", color: "#0e9f8a", border: "1px solid #b2e8e1" }}>Live</span>
          </a>
          <a href="/mounjaro/klarna" style={navLinkStyle("/mounjaro/klarna")}>Klarna</a>
          <a href="/mounjaro/clearpay" style={navLinkStyle("/mounjaro/clearpay")}>Clearpay</a>
          <a href="/about" style={navLinkStyle("/about")}>About</a>
          <a
            href="/contact"
            style={{ fontSize: "0.88rem", fontWeight: 500, background: "#0e9f8a", color: "white", textDecoration: "none", padding: "6px 14px", borderRadius: 8, marginLeft: 4 }}
          >
            Contact
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="sm:hidden"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5 }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "#0f1f3d", borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#0f1f3d", borderRadius: 2, transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#0f1f3d", borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden" style={{ borderTop: "1px solid #e2e6ef", background: "#fff", padding: "12px 20px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {([["Mounjaro", "/mounjaro"], ["Klarna", "/mounjaro/klarna"], ["Clearpay", "/mounjaro/clearpay"], ["About", "/about"]] as const).map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: "0.92rem", fontWeight: 500, color: "#1a1f2e", textDecoration: "none", padding: "10px 4px", borderBottom: "1px solid #e2e6ef" }}
            >
              {label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: 8, background: "#0e9f8a", color: "white", textAlign: "center", padding: 12, borderRadius: 8, fontSize: "0.92rem", fontWeight: 500, textDecoration: "none" }}
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
