import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-black pt-[100px]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-cormorant text-[clamp(32px,6vw,60px)] text-white uppercase tracking-[0.05em] font-light leading-none">RETURNS & EXCHANGES</h1>
          <div className="w-10 h-px bg-gold mx-auto mt-6" />
        </div>

        {[
          { title: 'Our Return Policy', body: 'We accept returns of unused, unopened products in their original packaging within 30 days of the delivery date. Due to hygiene and safety regulations, we are unable to accept returns of opened cosmetic products unless they are defective or damaged upon arrival. All returns require proof of purchase.' },
          { title: 'How to Start a Return', body: 'To initiate a return: log into your VELOUR NOIR account, go to Order History, select the relevant order and click "Return Item." If you checked out as a guest, email hello@veloirnoir.com with your order number and reason for return. We will email you a prepaid return shipping label within 24 hours.' },
          { title: 'Defective or Damaged Products', body: 'If your product arrives damaged, defective, or incorrect, please contact us within 7 days of receipt with photographs of the issue. We will arrange a replacement or full refund immediately, including return shipping. We take product quality seriously and investigate every reported issue.' },
          { title: 'Refund Processing', body: 'Once we receive and inspect your return, we process the refund within 3–5 business days. The credit will appear on your original payment method within 5–10 business days, depending on your financial institution. We will send you an email confirmation when your refund has been issued.' },
          { title: 'Exchanges', body: 'VELOUR NOIR does not offer direct exchanges. If you would like a different product or shade, please initiate a return for your original item and place a new order. This ensures you receive your new item as quickly as possible without waiting for the return to be processed.' },
          { title: 'Sale Items', body: 'Products purchased during sale events or with a promotional discount are eligible for return under the same conditions as full-price items, unless otherwise stated at the time of purchase. Final sale items are clearly marked and cannot be returned.' },
          { title: 'Gift Returns', body: 'If you received a VELOUR NOIR product as a gift and wish to return it, please contact our client services team with the order details provided by the gift giver. Refunds for gift returns are issued as store credit.' },
        ].map(({ title, body }) => (
          <div key={title} className="mb-9 border-b border-gold/10 pb-9 last:border-0">
            <h2 className="font-cormorant text-[22px] text-white uppercase tracking-[0.04em] font-light mb-3">{title}</h2>
            <p className="font-jost text-[13px] text-muted/90 leading-relaxed">{body}</p>
          </div>
        ))}

        <div className="border border-gold/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-jost text-[13px] text-muted">Need help with a return?</p>
          <Link href="/contact" className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold border border-gold/50 px-8 py-3 hover:bg-gold/10 transition-colors">
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
}
