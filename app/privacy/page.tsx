import NavBar from "../NavBar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F4F8FD]">
      <NavBar maxWidth="max-w-3xl" />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: 31 May 2026</p>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">1. Who we are</h2>
            <p>
              WeightLossPricesUK operates the website <strong>weightlosspricesuk.co.uk</strong> — a free price comparison
              tool for weight loss medication providers in the UK. We are not a clinic, pharmacy, or medication provider.
            </p>
            <p className="mt-2">
              For any privacy-related queries, contact us at:{" "}
              <a href="mailto:contact@weightlosspricesuk.co.uk" className="underline text-gray-900">
                contact@weightlosspricesuk.co.uk
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">2. What data we collect</h2>
            <p className="mb-3">We only collect data you provide voluntarily via the contact form:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>First and last name</li>
              <li>Email address</li>
              <li>Reason for contact</li>
              <li>Message content</li>
            </ul>
            <p className="mt-3">
              We do not use cookies, tracking pixels, or analytics tools. We do not collect any health or medical data.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">3. Why we collect it</h2>
            <p>
              Your contact form data is used solely to respond to your message. We do not use it for marketing,
              profiling, or any other purpose.
            </p>
            <p className="mt-2">
              The lawful basis for processing is <strong>legitimate interests</strong> (responding to direct
              enquiries you have initiated).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">4. How long we keep your data</h2>
            <p>
              Contact form submissions are delivered to our email inbox and retained only as long as necessary
              to resolve your enquiry. We do not maintain a separate database of contact form submissions.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">5. Third parties</h2>
            <p className="mb-3">Your data passes through the following third-party services:</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-800">Service</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-800">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-800">Privacy policy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium">Vercel</td>
                    <td className="px-4 py-3 text-gray-600">Website hosting</td>
                    <td className="px-4 py-3">
                      <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline">
                        vercel.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Zoho Mail</td>
                    <td className="px-4 py-3 text-gray-600">Email delivery</td>
                    <td className="px-4 py-3">
                      <a href="https://www.zoho.com/privacy.html" target="_blank" rel="noopener noreferrer" className="underline">
                        zoho.com
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">We do not sell, rent, or share your personal data with any other third parties.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">6. Your rights (UK GDPR)</h2>
            <p className="mb-3">Under UK GDPR you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Access</strong> — request a copy of the data we hold about you</li>
              <li><strong>Erasure</strong> — ask us to delete your data</li>
              <li><strong>Rectification</strong> — ask us to correct inaccurate data</li>
              <li><strong>Restriction</strong> — ask us to limit how we use your data</li>
              <li><strong>Object</strong> — object to our processing</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email{" "}
              <a href="mailto:contact@weightlosspricesuk.co.uk" className="underline text-gray-900">
                contact@weightlosspricesuk.co.uk
              </a>. We will respond within 2–3 working days.
            </p>
            <p className="mt-2">
              You also have the right to lodge a complaint with the UK&apos;s data protection authority:{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="underline">
                ico.org.uk
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">7. External links</h2>
            <p>
              This website contains links to third-party provider websites. We are not responsible for their
              content or privacy practices. Please review each provider&apos;s privacy policy before submitting
              any personal data to them.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">8. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The date at the top of this page will always reflect
              the most recent version.
            </p>
          </section>

        </div>
      </div>

      <footer style={{ backgroundColor: "#0D2D4F", borderTop: "1px solid #1a3a5c" }} className="py-6 px-4 text-center text-xs mt-10">
        <span style={{ color: "#7AABCE" }}>WeightLossPricesUK.co.uk — For informational purposes only. Not medical advice.</span>
      </footer>
    </div>
  );
}
