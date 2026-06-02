import NavBar from "../NavBar";
import Footer from "../Footer";

const SERIF = "var(--font-dm-serif, 'DM Serif Display'), Georgia, serif";

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", display: "flex", flexDirection: "column" }}>
      <NavBar />

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 80px", flex: 1, width: "100%" }}>
        <div style={{ marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid #e2e6ef" }}>
          <h1 style={{ fontFamily: SERIF, fontSize: "2rem", fontWeight: 400, color: "#0f1f3d", marginBottom: 8 }}>Terms &amp; Conditions</h1>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0 }}>Last updated: June 2026</p>
        </div>

        <div style={{ background: "#e6f7f5", borderLeft: "4px solid #0e9f8a", padding: "16px 20px", marginBottom: 32 }}>
          <p style={{ fontSize: "0.85rem", color: "#0a6b5a", margin: 0, lineHeight: 1.6 }}>
            By using WeightLossPricesUK.co.uk, you agree to these terms. Please read them carefully. If you do not agree, please do not use this site.
          </p>
        </div>

        <div style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.75 }}>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>1. About this site</h2>
          <p style={{ marginBottom: 14 }}>
            WeightLossPricesUK.co.uk is an independent price comparison website. We collect and display pricing information for weight loss medications from UK-registered online providers. We are not a pharmacy, clinic, or healthcare provider.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>2. Accuracy of information</h2>
          <p style={{ marginBottom: 14 }}>
            We make every reasonable effort to keep prices accurate and up to date. However, prices can change at any time without notice and we cannot guarantee that the information displayed on this site is current, complete, or accurate.
          </p>
          <p style={{ marginBottom: 14 }}>
            You must always visit the provider&apos;s website directly to confirm current pricing, eligibility, and availability before making any purchasing decision.
          </p>
          <p style={{ marginBottom: 14 }}>
            We accept no liability for any loss or damage arising from reliance on information displayed on this site.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>3. Not medical advice</h2>
          <p style={{ marginBottom: 14 }}>
            Nothing on this website constitutes medical advice. The information provided is for general informational purposes only. You should always consult a qualified healthcare professional before starting, changing, or stopping any medication or treatment.
          </p>
          <p style={{ marginBottom: 14 }}>
            We are not responsible for any health outcomes resulting from the use of information on this site or from purchases made through third-party providers.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>4. Third-party links</h2>
          <p style={{ marginBottom: 14 }}>
            This site contains links to third-party provider websites. These links are provided for your convenience only. We have no control over the content, pricing, availability, or practices of those websites and accept no responsibility for them.
          </p>
          <p style={{ marginBottom: 14 }}>
            Clicking a link to a provider website means you are leaving WeightLossPricesUK.co.uk and entering a third-party site with its own terms and conditions and privacy policy.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>5. Trademarks and third-party logos</h2>
          <p style={{ marginBottom: 14 }}>
            All trademarks, logos, and brand names displayed on this site are the property of their respective owners. They are used for identification purposes only and do not imply endorsement of or by WeightLossPricesUK. If you are a brand owner and wish to have your logo removed, please contact us at{" "}
            <a href="mailto:contact@weightlosspricesuk.co.uk" style={{ color: "#0e9f8a" }}>contact@weightlosspricesuk.co.uk</a>{" "}
            and we will action your request promptly.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>6. Intellectual property</h2>
          <p style={{ marginBottom: 14 }}>
            All content on this site &ndash; including text, layout, design, and data compilations &ndash; is the property of WeightLossPricesUK and is protected by UK copyright law. You may not reproduce, redistribute, or commercially exploit any content from this site without our written permission.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>7. Limitation of liability</h2>
          <p style={{ marginBottom: 14 }}>
            To the fullest extent permitted by law, WeightLossPricesUK shall not be liable for any direct, indirect, incidental, or consequential loss or damage arising from your use of this site or reliance on the information contained within it.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>8. Changes to these terms</h2>
          <p style={{ marginBottom: 14 }}>
            We may update these terms from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes are posted constitutes acceptance of the updated terms.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>9. Governing law</h2>
          <p style={{ marginBottom: 14 }}>
            These terms are governed by the laws of England and Wales. Any disputes arising from your use of this site shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>

          <h2 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 400, color: "#0f1f3d", margin: "36px 0 12px" }}>10. Contact</h2>
          <p style={{ marginBottom: 14 }}>
            If you have any questions about these terms, please contact us at{" "}
            <a href="mailto:contact@weightlosspricesuk.co.uk" style={{ color: "#0e9f8a" }}>contact@weightlosspricesuk.co.uk</a>.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
