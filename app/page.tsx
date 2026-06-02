import NavBar from "./NavBar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F4F8FD]">
      <NavBar />

      {/* Hero */}
      <section className="bg-[#2F7FD4] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Compare Weight Loss Medication Prices in the UK
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Independent, up-to-date price comparisons across UK-registered online providers.
            Find the best price for your medication — updated daily.
          </p>
        </div>
      </section>

      {/* Medication cards */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Choose a medication</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <a
            href="/mounjaro"
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base group-hover:text-[#2F7FD4] transition-colors">
                  Mounjaro
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">tirzepatide</p>
              </div>
              <span className="text-xs bg-blue-50 text-[#2F7FD4] font-medium px-2.5 py-1 rounded-full">
                View prices →
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              A weekly injection for weight management, approved in the UK. Available in doses
              from 2.5mg to 15mg across 60+ providers.
            </p>
          </a>

          <div className="bg-white rounded-xl border border-gray-100 p-6 opacity-50 cursor-not-allowed">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-500 text-base">Wegovy</h3>
                <p className="text-xs text-gray-400 mt-0.5">semaglutide</p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-400 font-medium px-2.5 py-1 rounded-full">
                Coming soon
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Price comparison for Wegovy providers coming soon.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0D2D4F] py-6 px-4 text-center text-xs mt-auto" style={{ borderTop: "1px solid #1a3a5c" }}>
        <span style={{ color: "#7AABCE" }}>WeightLossPricesUK.co.uk — For informational purposes only. Not medical advice. Always consult a qualified healthcare professional.</span>
        <span style={{ color: "#1a3a5c" }} className="mx-2">·</span>
        <a href="/privacy" style={{ color: "#7AABCE" }} className="underline hover:text-white transition-colors">Privacy Policy</a>
      </footer>
    </div>
  );
}
