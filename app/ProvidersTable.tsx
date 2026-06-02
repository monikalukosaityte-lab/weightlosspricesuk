"use client";

import { useState } from "react";
import type { Provider } from "./page";

type ProviderWithLogo = Provider & { logo: string | null };

const DOSES = [
  { key: "price_2_5",  label: "2.5mg" },
  { key: "price_5",    label: "5mg" },
  { key: "price_7_5",  label: "7.5mg" },
  { key: "price_10",   label: "10mg" },
  { key: "price_12_5", label: "12.5mg" },
  { key: "price_15",   label: "15mg" },
] as const;

const FILTER_GROUPS = [
  {
    label: "Dose",
    filters: DOSES.map(d => ({ key: d.key, label: d.label })),
  },
  {
    label: "Compliance",
    filters: [
      { key: "gphc", label: "GPhC" },
      { key: "cqc",  label: "CQC" },
    ],
  },
  {
    label: "Plans",
    filters: [
      { key: "sub",          label: "Sub" },
      { key: "bundles",      label: "Bundles" },
      { key: "saving_plans", label: "Saving Plans" },
    ],
  },
  {
    label: "Payments",
    filters: [
      { key: "klarna", label: "Klarna" },
      { key: "paypal", label: "PayPal" },
    ],
  },
  {
    label: "Offers",
    filters: [
      { key: "has_discount", label: "Has discount" },
      { key: "stars_4_5",    label: "4.5+ ★" },
    ],
  },
];

function Bool({ val }: { val: boolean | null }) {
  if (val === true)  return <span className="font-medium" style={{ color: '#1A7A4A' }}>✓</span>;
  if (val === false) return <span style={{ color: '#D1D5DB' }}>✗</span>;
  return <span style={{ color: '#D1D5DB' }}>—</span>;
}

function CqcBadge({ registered, rating }: { registered: boolean | null; rating: string | null }) {
  if (!registered && !rating) return <span style={{ color: '#D1D5DB' }}>—</span>;
  if (rating === "Outstanding")          return <span className="px-1 py-0.5 rounded text-[10px] font-semibold" style={{ background: '#E8F2FC', color: '#2F7FD4' }}>Outstanding</span>;
  if (rating === "Good")                 return <span className="font-medium" style={{ color: '#1A7A4A' }} title="CQC Good">✓</span>;
  if (rating === "Requires Improvement") return <span className="px-1 py-0.5 rounded text-[10px] font-semibold" style={{ background: '#F3F4F6', color: '#6B7280' }}>Req. Improv.</span>;
  if (rating === "Inadequate")           return <span className="px-1 py-0.5 rounded text-[10px] font-semibold" style={{ background: '#F3F4F6', color: '#6B7280' }}>Inadequate</span>;
  return <span className="font-medium" style={{ color: '#1A7A4A' }} title="CQC registered">✓</span>;
}

const stickyColShadow = "shadow-[2px_0_6px_-1px_rgba(0,0,0,0.08)]";

export default function ProvidersTable({ providers }: { providers: ProviderWithLogo[] }) {
  const [sortDose, setSortDose] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  function toggleFilter(key: string) {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const sorted = [...providers].sort((a, b) => {
    if (!sortDose) return a.name.localeCompare(b.name);
    const av = a[sortDose as keyof Provider] as number | null;
    const bv = b[sortDose as keyof Provider] as number | null;
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    return av - bv;
  });

  const filtered = sorted.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilters.has("gphc") && !p.gphc_registered && !p.gphc_number) return false;
    if (activeFilters.has("cqc") && !p.cqc_registered) return false;
    if (activeFilters.has("sub") && !p.subscription) return false;
    if (activeFilters.has("bundles") && !p.bundles) return false;
    if (activeFilters.has("saving_plans") && !p.saving_plans) return false;
    if (activeFilters.has("klarna") && !p.klarna) return false;
    if (activeFilters.has("paypal") && !p.paypal_pay3) return false;
    if (activeFilters.has("has_discount") && !p.discounts) return false;
    if (activeFilters.has("stars_4_5") && (p.review_stars == null || p.review_stars < 4.5)) return false;
    for (const dose of DOSES) {
      if (activeFilters.has(dose.key) && p[dose.key as keyof Provider] == null) return false;
    }
    return true;
  });

  const cheapestByDose: Record<string, number> = {};
  for (const d of DOSES) {
    const vals = providers
      .map(p => p[d.key as keyof Provider] as number | null)
      .filter((v): v is number => v != null);
    if (vals.length) cheapestByDose[d.key] = Math.min(...vals);
  }

  const hasActiveFilters = search.length > 0 || activeFilters.size > 0;

  return (
    <div>
      {/* Filter bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 mb-4 shadow-sm space-y-2">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search provider…"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        />
        {FILTER_GROUPS.map(group => (
          <div key={group.label} className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-gray-400 font-medium flex-shrink-0" style={{ minWidth: '52px' }}>{group.label}</span>
            {group.filters.map(f => {
              const active = activeFilters.has(f.key);
              return (
                <button
                  key={f.key}
                  onClick={() => toggleFilter(f.key)}
                  className="rounded-full font-medium border transition-colors"
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    ...(active
                      ? { backgroundColor: '#0D2D4F', color: '#ffffff', borderColor: '#0D2D4F' }
                      : { backgroundColor: '#ffffff', color: '#6B7280', borderColor: '#E5E7EB' })
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        ))}
        {hasActiveFilters && (
          <button
            onClick={() => { setSearch(""); setActiveFilters(new Set()); }}
            className="text-xs underline"
            style={{ color: '#9CA3AF' }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Sort pills */}
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 font-medium">Sort by dose:</span>
          {DOSES.map(d => (
            <button
              key={d.key}
              onClick={() => setSortDose(d.key)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${
                sortDose === d.key
                  ? "bg-[#2F7FD4] text-white border-[#2F7FD4]"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-[#E8F2FC]"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-400">
          {filtered.length} of {providers.length} providers
          <span className="md:inline hidden ml-1">· swipe to see all columns →</span>
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="text-xs md:text-sm" style={{ borderCollapse: "collapse", minWidth: "900px" }}>
          <thead>
            <tr className="bg-[#0D2D4F] border-b border-[#1a3a5c] text-xs text-blue-200 uppercase tracking-wider">
              <th className="sticky left-0 z-20 bg-[#0D2D4F] text-left px-2 py-2 md:px-4 md:py-3 font-semibold border-r border-[#1a3a5c]" style={{ width: '110px', maxWidth: '110px' }}></th>
              <th colSpan={6} className="text-center px-2 py-2 md:px-4 md:py-3 font-semibold border-r border-[#1a3a5c]">Prices / monthly pack</th>
              <th colSpan={2} className="text-center px-2 py-2 md:px-4 md:py-3 font-semibold border-r border-[#1a3a5c]">Reviews</th>
              <th colSpan={2} className="text-center px-2 py-2 md:px-4 md:py-3 font-semibold border-r border-[#1a3a5c]">Provider Details</th>
              <th colSpan={3} className="text-center px-2 py-2 md:px-4 md:py-3 font-semibold border-r border-[#1a3a5c]">Plans</th>
              <th colSpan={2} className="text-center px-2 py-2 md:px-4 md:py-3 font-semibold border-r border-[#1a3a5c]">Payments</th>
              <th className="text-center px-2 py-2 md:px-4 md:py-3 font-semibold border-r border-[#1a3a5c]">Discounts</th>
              <th className="px-2 py-2 md:px-4 md:py-3 bg-[#0D2D4F]"></th>
            </tr>
            <tr className="border-b border-[#1a3a5c] text-xs text-white bg-[#0D2D4F]">
              <th className={`sticky left-0 top-0 z-30 bg-[#0D2D4F] border-r border-[#1a3a5c] px-2 py-1.5 md:px-4 md:py-2.5 text-left font-semibold text-white ${stickyColShadow}`} style={{ width: '110px', maxWidth: '110px' }}>
                Provider
              </th>
              {DOSES.map(d => (
                <th
                  key={d.key}
                  onClick={() => setSortDose(d.key)}
                  className={`sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white cursor-pointer hover:bg-[#0D2D4F] transition-colors whitespace-nowrap ${
                    sortDose === d.key ? "underline decoration-dotted" : ""
                  }`}
                >
                  {d.label} {sortDose === d.key ? "↑" : ""}
                </th>
              ))}
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white border-l border-[#1a3a5c]">Stars</th>
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white border-r border-[#1a3a5c]">Reviews</th>
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white">GPhC</th>
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white border-r border-[#1a3a5c]">CQC</th>
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white">Sub</th>
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white">Bundles</th>
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white border-r border-[#1a3a5c]">Longer Plans</th>
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white">Klarna</th>
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white border-r border-[#1a3a5c]">PayPal</th>
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 font-medium bg-[#0D2D4F] text-white border-r border-[#1a3a5c]">Code / offer</th>
              <th className="sticky top-0 z-10 px-2 py-1.5 md:px-4 md:py-2.5 bg-[#0D2D4F]"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={18} className="px-4 py-10 text-center text-sm text-gray-400">
                  No providers match your filters.{" "}
                  <button onClick={() => { setSearch(""); setActiveFilters(new Set()); }} className="underline">Clear filters</button>
                </td>
              </tr>
            ) : filtered.map((p) => {
              const isCheapest = p.price_2_5 != null && p.price_2_5 === cheapestByDose["price_2_5"];
              const rowBg = isCheapest ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-50";
              const stickyBg = isCheapest ? "bg-gray-50" : "bg-white";

              return (
                <tr key={p.name} className={`border-b border-gray-100 transition-colors ${rowBg}`}>
                  <td className={`sticky left-0 z-10 ${stickyBg} px-2 py-2 md:px-4 md:py-3 border-r border-gray-200 ${stickyColShadow}`}>
                    <div className="flex items-center gap-2">
                      {p.logo ? (
                        <img src={p.logo} alt={p.name} className="w-5 h-5 md:w-8 md:h-8 object-contain rounded flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 md:w-8 md:h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
                          {p.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
                          {p.url
                            ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#2F7FD4]">{p.name}</a>
                            : <span>{p.name}</span>
                          }
                        </div>
                        {isCheapest && (
                          <div className="mt-0.5">
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap border border-gray-200">Lowest</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {DOSES.map(d => {
                    const val = p[d.key as keyof Provider] as number | null;
                    const isCheapestDose = val != null && val === cheapestByDose[d.key];
                    return (
                      <td
                        key={d.key}
                        className={`px-2 py-2 md:px-4 md:py-3 text-center whitespace-nowrap font-medium ${
                          isCheapestDose ? "text-gray-900 font-bold" : "text-gray-700"
                        }`}
                      >
                        {val != null ? `£${val}` : <span className="text-gray-300">—</span>}
                      </td>
                    );
                  })}

                  <td className="px-2 py-2 md:px-4 md:py-3 text-center whitespace-nowrap border-l border-gray-100" style={{ color: '#F59E0B' }}>
                    {p.review_stars != null ? `★ ${p.review_stars}` : <span style={{ color: '#D1D5DB' }}>—</span>}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 text-center border-r border-gray-100 whitespace-nowrap">
                    {p.review_count != null ? (
                      p.trustpilot_url
                        ? <a href={p.trustpilot_url} target="_blank" rel="noopener noreferrer" className="text-gray-700 underline decoration-dotted hover:text-[#2F7FD4]">{p.review_count.toLocaleString()}</a>
                        : <span className="text-gray-700">{p.review_count.toLocaleString()}</span>
                    ) : <span className="text-gray-300">—</span>}
                  </td>

                  <td className="px-2 py-2 md:px-4 md:py-3 text-center">
                    {p.gphc_number
                      ? <span className="font-medium" style={{ color: '#1A7A4A' }} title={`GPhC: ${p.gphc_number}`}>✓</span>
                      : <Bool val={p.gphc_registered} />
                    }
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-3 text-center border-r border-gray-100">
                    <CqcBadge registered={p.cqc_registered} rating={p.cqc_rating} />
                  </td>

                  <td className="px-2 py-2 md:px-4 md:py-3 text-center"><Bool val={p.subscription} /></td>
                  <td className="px-2 py-2 md:px-4 md:py-3 text-center"><Bool val={p.bundles} /></td>
                  <td className="px-2 py-2 md:px-4 md:py-3 text-center border-r border-gray-100"><Bool val={p.saving_plans} /></td>

                  <td className="px-2 py-2 md:px-4 md:py-3 text-center"><Bool val={p.klarna} /></td>
                  <td className="px-2 py-2 md:px-4 md:py-3 text-center border-r border-gray-100"><Bool val={p.paypal_pay3} /></td>

                  <td className="px-2 py-2 md:px-4 md:py-3 border-r border-gray-100 max-w-[180px]">
                    {p.discounts ? (
                      <span className="text-xs line-clamp-2 text-gray-600" title={p.discounts}>{p.discounts}</span>
                    ) : (
                      <span className="block text-center" style={{ color: '#D1D5DB' }}>—</span>
                    )}
                  </td>

                  <td className="px-2 py-2 md:px-4 md:py-3">
                    {(p.url || p.brand_url) && (
                      <a
                        href={(p.url || p.brand_url)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors border"
                        style={{ backgroundColor: 'white', color: '#0D2D4F', borderColor: '#d1d5db' }}
                      >
                        View →
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
