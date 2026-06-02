import NavBar from "../NavBar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F8FD]">
      <NavBar maxWidth="max-w-3xl" />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">About Us</h1>
        <p className="text-sm text-gray-400 mb-10">WeightLossPricesUK.co.uk</p>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">What we do</h2>
            <p>
              WeightLossPricesUK is a free, independent price comparison tool for weight loss
              medications available from UK-registered online providers. We help you find and compare
              prices across clinics and pharmacies so you can make an informed decision before you buy.
            </p>
            <p className="mt-3">
              We are not a clinic, pharmacy, or medication provider. We do not sell, prescribe, or
              dispense any medications.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">How it works</h2>
            <p>
              We collect publicly available pricing information from UK-registered providers and update
              our database regularly. Prices are shown for indicative purposes only — always visit the
              provider&apos;s website directly to confirm current prices, eligibility, and terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">Independence</h2>
            <p>
              WeightLossPricesUK is editorially independent. We are not paid by any provider to
              influence their ranking or position on this site. Providers are listed based on data
              completeness and price availability.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">Important disclaimer</h2>
            <p>
              Nothing on this website constitutes medical advice. Weight loss medications are
              prescription-only and must be obtained via a qualified prescriber following a
              clinical assessment. Always consult your GP or a registered healthcare professional
              before starting any new medication.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">Get in touch</h2>
            <p>
              Found an incorrect price, a missing provider, or a broken link?{" "}
              <a href="/contact" className="underline text-gray-900 hover:text-gray-600">
                Contact us
              </a>{" "}
              and we&apos;ll look into it.
            </p>
          </section>

        </div>
      </div>

      <footer style={{ backgroundColor: "#0D2D4F", borderTop: "1px solid #1a3a5c" }} className="py-6 px-4 text-center text-xs mt-10">
        <span style={{ color: "#7AABCE" }}>WeightLossPricesUK.co.uk — For informational purposes only. Not medical advice.</span>
        <span style={{ color: "#1a3a5c" }} className="mx-2">·</span>
        <a href="/privacy" style={{ color: "#7AABCE" }} className="underline hover:text-white transition-colors">Privacy Policy</a>
      </footer>
    </div>
  );
}
