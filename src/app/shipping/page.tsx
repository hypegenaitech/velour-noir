import Link from 'next/link';

const METHODS = [
  { name: 'Standard Shipping', time: '5–7 business days', cost: 'Free over $100 / $8 below', notes: 'Available to all US addresses including PO boxes.' },
  { name: 'Express Shipping', time: '2–3 business days', cost: '$15', notes: 'Order must be placed by 2pm EST for same-day dispatch.' },
  { name: 'Overnight', time: 'Next business day', cost: '$35', notes: 'Available Monday–Thursday. Order by 12pm EST.' },
  { name: 'International', time: '7–14 business days', cost: 'From $18', notes: 'Available to 60+ countries. Duties and taxes may apply.' },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-black pt-[100px]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-cormorant text-[clamp(36px,7vw,64px)] text-white uppercase tracking-[0.05em] font-light leading-none">SHIPPING & DELIVERY</h1>
          <div className="w-10 h-px bg-gold mx-auto mt-6" />
        </div>

        {/* Methods */}
        <div className="space-y-4 mb-14">
          {METHODS.map((m) => (
            <div key={m.name} className="border border-gold/20 p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <h2 className="font-cormorant text-[20px] text-white uppercase tracking-[0.03em] font-light">{m.name}</h2>
                <span className="font-jost text-[13px] text-gold">{m.cost}</span>
              </div>
              <p className="font-jost text-[12px] text-muted">{m.time}</p>
              <p className="font-jost text-[12px] text-muted/70 mt-1">{m.notes}</p>
            </div>
          ))}
        </div>

        {/* Info sections */}
        {[
          { title: 'Processing Times', body: 'Orders placed before 2pm EST Monday–Friday are typically dispatched the same business day. Orders placed on weekends or public holidays are dispatched the following business day. During high-volume periods (new launches, sale events), processing may take 1–2 additional business days.' },
          { title: 'Order Tracking', body: 'Once your order ships, you will receive an email with a tracking number and a direct link to your carrier\'s tracking page. Tracking information may take 12–24 hours to activate after dispatch. You can also view your order status in your account under Order History.' },
          { title: 'International Orders', body: 'VELOUR NOIR ships to over 60 countries worldwide. International customers are responsible for any applicable duties, customs fees, and local taxes. These charges are determined by your local customs authority and are not within our control. We declare all orders at full commercial value as required by law.' },
          { title: 'Undeliverable Packages', body: 'If a package is returned to us as undeliverable (incorrect address, failure to collect from depot, refused delivery), we will contact you by email. Reshipping charges apply for addresses confirmed as incorrect. We recommend double-checking your shipping address before placing your order.' },
        ].map(({ title, body }) => (
          <div key={title} className="mb-8">
            <h3 className="font-cormorant text-[22px] text-white uppercase tracking-[0.04em] font-light mb-3">{title}</h3>
            <p className="font-jost text-[13px] text-muted/90 leading-relaxed">{body}</p>
          </div>
        ))}

        <div className="mt-10 border-t border-gold/20 pt-8">
          <p className="font-jost text-[12px] text-muted">Questions about your order?{' '}
            <Link href="/contact" className="text-gold hover:text-gold-light transition-colors">Contact our client services team.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
