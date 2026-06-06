import { readFileSync } from "fs";
import { join } from "path";
import { type Provider } from "../../ProvidersTable";
import NavBar from "../../NavBar";
import Footer from "../../Footer";
import KlarnaTable from "./KlarnaTable";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Buy Mounjaro with Klarna UK 2026 | Compare Providers | WeightLossPricesUK",
  description: "Compare UK providers offering Mounjaro with Klarna payment. See prices across all doses from 2.5mg to 15mg. Always confirm Klarna availability directly with the provider.",
  robots: { index: true, follow: true },
};

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

const LOGOS: Record<string, string> = {
  "Asda": "Asda.png",
  "Ashcroft Pharmacy": "Ashcroft_Pharmacy.webp",
  "Assured Pharmacy": "Assured_Pharmacy.png",
  "Bolt Pharmacy": "Bolt_Pharmacy.webp",
  "Boots": "Boots.png",
  "Cadham Pharmacy": "Cadham_Pharmacy.png",
  "CheqUp": "CheqUp.png",
  "Click Pharmacy": "Click_Pharmacy.webp",
  "Click2Pharmacy": "Click2Pharmacy.webp",
  "Cloud Pharmacy": "Cloud_Pharmacy.png",
  "Cured Pharmacy": "Cured_Pharmacy.png",
  "Curely": "Curely.png",
  "eMeds Pharmacy": "eMeds_Pharmacy.png",
  "e-Surgery": "e-Surgery.png",
  "MedExpress": "MedExpress.png",
  "Envigore": "Envigore.png",
  "Farmeci": "Farmeci.png",
  "Fylde Clinic": "Fylde_Clinic.png",
  "Health Express": "Health_Express.png",
  "IQ Doctor": "IQ_Doctor.svg",
  "Juniper / MyJuniper": "Juniper___MyJuniper.svg",
  "Live Well Weight Loss": "Live_Well_Weight_Loss.png",
  "Lloyds Pharmacy Online Doctor": "Lloyds_Pharmacy.svg",
  "Lotus Weight Loss": "Lotus_Weight_Loss.svg",
  "Manchester Weight Loss Clinic": "Manchester_Weight_Loss_Clinic.png",
  "Mayfair Weight Loss Clinic": "Mayfair_Weight_Loss.svg",
  "Medicine Marketplace": "Medicine_Marketplace.png",
  "Medicspot": "Medicspot.png",
  "Medino": "Medino.png",
  "Morrisons Clinic": "Morrisons_Clinic.png",
  "MSH Weight Loss": "MSH_Weight_Loss.png",
  "myBMI": "MyBMI.png",
  "My London Pharmacy": "My_London_Pharmacy.png",
  "Numan": "Numan.svg",
  "Oushk Pharmacy": "Oushk_Pharmacy.png",
  "Oxford Online Pharmacy": "Oxford_Online_Pharmacy.png",
  "Peak Pharmacy": "Peak_Pharmacy.png",
  "Pharmacy2U": "Pharmacy2U.png",
  "Pharmacy Advance": "Pharmacy_Advance.png",
  "Pharmacy Express": "Pharmacy_Express.png",
  "Pharmacy Online": "Pharmacy_Online.png",
  "Pharmacy Planet": "Pharmacy_Planet.png",
  "Pharmulous": "Pharmulous.png",
  "Phlo Clinic": "Phlo_Clinic.svg",
  "PillSorted": "PillSorted.svg",
  "PillTime": "PillTime.png",
  "Prescription Doctor": "Prescription_Doctor.svg",
  "QuickMeds": "QuickMeds.png",
  "Rightangled": "Rightangled.svg",
  "Rowlands Pharmacy": "Rowlands_Pharmacy.svg",
  "Second Nature": "Second_Nature.png",
  "Simple Online Pharmacy": "Simple_Online_Pharmacy.svg",
  "Simply Meds Online": "Simply_Meds_Online.svg",
  "Slimmr": "Slimmr.svg",
  "Superdrug Online Doctor": "Superdrug_Online_Doctor.png",
  "Swift Doctor": "Swift_Doctor.png",
  "The Care Pharmacy": "The_Care_Pharmacy.png",
  "The Family Chemist": "The_Family_Chemist.png",
  "The Health Dispensary": "The_Health_Dispensary.webp",
  "The Independent Pharmacy": "The_Independent_Pharmacy.png",
  "The Private Pharmacy Clinic": "The_Private_Pharmacy_Clinic.png",
  "Tribelle": "Tribelle.svg",
  "Trim": "Trim.png",
  "UK Meds": "UK_Meds.png",
  "Voy": "Voy.svg",
  "Well Pharmacy": "Well_Pharmacy.png",
  "WePrescribe": "WePrescribe.png",
  "YourMedicals": "YourMedicals.png",
  "ZAVA": "ZAVA.png",
};

function loadKlarnaProviders() {
  const raw = readFileSync(join(process.cwd(), "data/providers.json"), "utf-8");
  const parsed = JSON.parse(raw);
  const all: Provider[] = Array.isArray(parsed) ? parsed : parsed.providers;
  const dateStr = Array.isArray(parsed) ? null : parsed.last_updated;
  const lastUpdated = dateStr
    ? new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "-";
  const providers = all
    .filter(p => p.klarna)
    .map(p => ({ ...p, logo: LOGOS[p.name] ? `/logos/${LOGOS[p.name]}` : null }));
  return { providers, lastUpdated };
}

export default function MounjaroKlarnaPage() {
  const { providers, lastUpdated } = loadKlarnaProviders();

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", display: "flex", flexDirection: "column" }}>
      <NavBar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, #0f1f3d 0%, #1a3260 60%, #1e4d8c 100%)", color: "white", padding: "48px 0 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%, rgba(14,159,138,0.18) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(14,159,138,0.18)", border: "1px solid rgba(14,159,138,0.35)", color: "#7de8d8", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 20, marginBottom: 16 }}>
            Mounjaro - Klarna payment
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, lineHeight: 1.2, marginBottom: 12, maxWidth: 560 }}>
            Buy Mounjaro with <span style={{ color: "#7de8d8" }}>Klarna</span> in the UK
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 520, margin: 0 }}>
            {providers.length} UK-registered providers list Klarna as a payment option for Mounjaro (tirzepatide). Compare prices across all doses below. Klarna availability must always be confirmed directly with the provider before ordering.
          </p>
        </div>
      </section>

      <KlarnaTable providers={providers} lastUpdated={lastUpdated} />

      <Footer />
    </div>
  );
}
