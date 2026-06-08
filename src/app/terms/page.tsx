export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black pt-[100px]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-cormorant text-[clamp(36px,7vw,64px)] text-white uppercase tracking-[0.05em] font-light leading-none">TERMS & CONDITIONS</h1>
          <div className="w-10 h-px bg-gold mx-auto mt-6" />
          <p className="font-jost text-[11px] text-muted mt-4">Last updated: December 1, 2024</p>
        </div>

        <div className="space-y-10">
          {[
            { title: '1. Acceptance of Terms', body: 'By accessing or using the VELOUR NOIR website (veloirnoir.com), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our website or services.' },
            { title: '2. Products and Pricing', body: 'All prices displayed on the VELOUR NOIR website are in US Dollars and are inclusive of applicable taxes unless otherwise stated. We reserve the right to change prices at any time without notice. Product availability is subject to change. In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price.' },
            { title: '3. Orders and Payment', body: 'By placing an order, you represent that the information you have provided is accurate and complete, and that you are authorised to use the payment method submitted. Order acceptance is confirmed via email. VELOUR NOIR reserves the right to refuse or cancel any order for any reason, including suspected fraudulent activity.' },
            { title: '4. Shipping and Delivery', body: 'Delivery times are estimates only and are not guaranteed. VELOUR NOIR is not responsible for delays caused by customs processing, carrier issues, or circumstances beyond our control. Risk of loss and title for products pass to you upon delivery to the carrier.' },
            { title: '5. Returns and Refunds', body: 'Returns are governed by our Returns & Exchanges Policy, which is incorporated by reference into these Terms. Refunds will be issued to the original payment method. We reserve the right to refuse returns that do not meet our return criteria.' },
            { title: '6. Intellectual Property', body: 'All content on the VELOUR NOIR website — including but not limited to text, photographs, graphics, product names, and logos — is the property of VELOUR NOIR Ltd. and is protected by applicable intellectual property laws. Reproduction, distribution, or commercial use of any content without express written permission is prohibited.' },
            { title: '7. Limitation of Liability', body: 'To the maximum extent permitted by law, VELOUR NOIR shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the product giving rise to the claim.' },
            { title: '8. Governing Law', body: 'These Terms and Conditions shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.' },
            { title: '9. Changes to Terms', body: 'VELOUR NOIR reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Continued use of the website following any changes constitutes acceptance of the revised terms.' },
            { title: '10. Contact', body: 'Questions regarding these Terms and Conditions may be directed to: legal@veloirnoir.com or VELOUR NOIR Ltd., 12 Mayfair Place, London, W1K 3AB, United Kingdom.' },
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
