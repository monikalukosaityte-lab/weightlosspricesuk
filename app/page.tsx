import { readFileSync, statSync } from "fs";
import { join } from "path";
import ProvidersTable from "./ProvidersTable";
import NavBar from "./NavBar";

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

function loadProviders(): (Provider & { logo: string | null })[] {
  const raw = readFileSync(join(process.cwd(), "data/providers.json"), "utf-8");
  const data: Provider[] = JSON.parse(raw);
  return data.map((p) => ({
    ...p,
    logo: LOGOS[p.name] ? `/logos/${LOGOS[p.name]}` : null,
  }));
}

export default function Home() {
  const providers = loadProviders();
  const withPrice = providers.filter((p) => p.price_2_5 != null);
  const cheapest2_5 = Math.min(...withPrice.map((p) => p.price_2_5!));
  const lastUpdated = statSync(join(process.cwd(), "data/providers.json")).mtime
    .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#F4F8FD]">
      <NavBar badge={`Updated ${lastUpdated} · ${providers.length} providers`} />

      {/* Hero */}
      <section className="bg-[#2F7FD4] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-3">Compare Weight Loss Medication Prices in the UK</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            See how Mounjaro (tirzepatide) prices compare across UK-registered online providers.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-[#2571bc] rounded-full px-5 py-2.5 text-sm font-medium">
            <span>💡</span>
            <span>2.5mg prices start from <strong>£{cheapest2_5}</strong>/mo</span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-4 mt-6 mb-2">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
            <div className="text-2xl font-bold" style={{ color: '#2F7FD4' }}>{providers.length}</div>
            <div className="text-xs text-gray-500 mt-1">Providers</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
            <div className="text-2xl font-bold" style={{ color: '#2F7FD4' }}>£{cheapest2_5}</div>
            <div className="text-xs text-gray-500 mt-1">Lowest 2.5mg</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
            <div className="text-lg font-bold" style={{ color: '#2F7FD4' }}>{lastUpdated}</div>
            <div className="text-xs text-gray-500 mt-1">Last updated</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 mt-6 mb-16">
        <ProvidersTable providers={providers} />

        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          Prices shown are collected from publicly available information and are for indicative purposes only.
          They may be out of date, incomplete, or subject to change without notice. We do not guarantee the
          accuracy of any pricing listed. Always visit the provider&apos;s website directly to confirm current
          prices, eligibility criteria, and full terms before making any purchasing decision.
          WeightLossPricesUK is not affiliated with any provider listed.
        </p>
      </div>

      {/* Info cards */}
      <section className="max-w-7xl mx-auto px-4 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-2">What is Mounjaro?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Mounjaro (tirzepatide) is a weekly injection approved in the UK for weight management.
            It works by mimicking two hormones that regulate appetite and blood sugar.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-2">How do I choose a provider?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Look for GPhC-registered pharmacies or CQC-registered clinics. Compare price, delivery
            speed, and support options. Always confirm eligibility directly with the provider.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-2">Is it safe to buy online?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Yes, if the provider is registered with the CQC and their prescribers are
            GMC-registered. All providers listed here are GPhC-registered pharmacies or
            CQC-registered clinics.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D2D4F] py-6 px-4 text-center text-xs mt-auto" style={{ borderTop: "1px solid #1a3a5c" }}>
        <span style={{ color: "#7AABCE" }}>WeightLossPricesUK.co.uk — For informational purposes only. Not medical advice. Always consult a qualified healthcare professional.</span>
        <span style={{ color: "#1a3a5c" }} className="mx-2">·</span>
        <a href="/privacy" style={{ color: "#7AABCE" }} className="underline hover:text-white transition-colors">Privacy Policy</a>
      </footer>
    </div>
  );
}
