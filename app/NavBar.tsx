"use client";

import { useState } from "react";

interface NavBarProps {
  badge?: string;
  maxWidth?: string;
}

export default function NavBar({ badge, maxWidth = "max-w-7xl" }: NavBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#0D2D4F" }}>
      <div className={`${maxWidth} mx-auto px-4 py-3 flex items-center justify-between`}>
        <a href="/" className="flex items-center gap-2.5">
          <img src="/weightlosspricesuk-favicon.svg" alt="WeightLossPricesUK" className="w-8 h-8" />
          <span className="font-bold text-lg text-white">
            WeightLossPrices<span style={{ color: "#6AAEE8" }}>UK</span>
          </span>
        </a>

        <div className="flex items-center gap-4">
          {/* Desktop right content */}
          <a
            href="/about"
            className="text-sm hidden sm:block transition-colors"
            style={{ color: "#7AABCE" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#7AABCE")}
          >
            About
          </a>
          <a
            href="/contact"
            className="text-sm hidden sm:block transition-colors"
            style={{ color: "#7AABCE" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#7AABCE")}
          >
            Contact us
          </a>
          {badge && (
            <span
              className="text-xs rounded-full px-3 py-1.5 hidden sm:block"
              style={{ color: "#7AABCE", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {badge}
            </span>
          )}

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex flex-col justify-center gap-1.5 w-7 h-7 p-0.5"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className="block w-full h-0.5 rounded transition-all"
              style={{
                backgroundColor: "#ffffff",
                transform: open ? "translateY(8px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-full h-0.5 rounded transition-all"
              style={{
                backgroundColor: "#ffffff",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block w-full h-0.5 rounded transition-all"
              style={{
                backgroundColor: "#ffffff",
                transform: open ? "translateY(-8px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="sm:hidden"
          style={{ borderTop: "1px solid #1a3a5c" }}
        >
          <nav className="px-4 py-2">
            <a
              href="/about"
              className="block text-sm py-3"
              style={{ color: "#7AABCE", borderBottom: "1px solid #1a3a5c" }}
              onClick={() => setOpen(false)}
            >
              About
            </a>
            <a
              href="/contact"
              className="block text-sm py-3"
              style={{ color: "#7AABCE", borderBottom: "1px solid #1a3a5c" }}
              onClick={() => setOpen(false)}
            >
              Contact us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
