export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black pt-[100px]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-cormorant text-[clamp(36px,7vw,64px)] text-white uppercase tracking-[0.05em] font-light leading-none">PRIVACY POLICY</h1>
          <div className="w-10 h-px bg-gold mx-auto mt-6" />
          <p className="font-jost text-[11px] text-muted mt-4">Last updated: December 1, 2024</p>
        </div>

        <div className="space-y-10">
          {[
            { title: '1. Information We Collect', body: 'When you use the VELOUR NOIR website, we may collect: personal identification information (name, email address, phone number, shipping and billing address); payment information (processed securely via our payment partners — we do not store card details); browsing data (pages visited, products viewed, time on site); device and technical information (IP address, browser type, operating system).' },
            { title: '2. How We Use Your Information', body: 'We use the information we collect to: process and fulfil your orders; communicate with you about your orders, account, and enquiries; send marketing communications (with your consent); improve our website, products, and customer experience; detect and prevent fraud; comply with legal obligations.' },
            { title: '3. Sharing Your Information', body: 'We do not sell, rent, or trade your personal information to third parties. We may share information with: service providers who assist us in operating our website and fulfilling orders (payment processors, shipping carriers, email platforms); analytics providers; law enforcement or regulatory bodies when required by law.' },
            { title: '4. Cookies', body: 'Our website uses cookies to enhance your browsing experience, remember your preferences, and analyse site traffic. Essential cookies are required for the website to function. You may disable non-essential cookies through your browser settings or our cookie preference centre, though this may affect your experience.' },
            { title: '5. Data Retention', body: 'We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including legal, accounting, or reporting requirements. Order information is typically retained for 7 years for tax and accounting purposes. You may request deletion of your account and personal data at any time, subject to legal retention requirements.' },
            { title: '6. Your Rights', body: 'Subject to applicable law, you have the right to: access the personal data we hold about you; correct inaccurate or incomplete data; request deletion of your data; object to or restrict processing of your data; data portability; withdraw consent at any time where processing is based on consent. To exercise any of these rights, contact privacy@veloirnoir.com.' },
            { title: '7. Security', body: 'We implement appropriate technical and organisational security measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. All payment processing is handled by PCI-DSS compliant payment partners. However, no method of transmission over the internet is 100% secure.' },
            { title: '8. Children\'s Privacy', body: 'The VELOUR NOIR website is not directed at children under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately.' },
            { title: '9. Contact', body: 'For privacy-related questions, requests, or complaints, contact our Data Protection Officer at: privacy@veloirnoir.com or VELOUR NOIR Ltd., 12 Mayfair Place, London, W1K 3AB, United Kingdom.' },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="font-cormorant text-[20px] text-white uppercase tracking-[0.04em] font-light mb-3">{title}</h2>
              <p className="font-jost text-[13px] text-muted/90 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
