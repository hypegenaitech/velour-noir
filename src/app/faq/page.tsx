'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    category: 'ORDERS',
    items: [
      { q: 'How do I place an order?', a: 'Browse our collections, add products to your bag, and proceed through our secure checkout. We accept all major credit cards, PayPal, Apple Pay, and Google Pay.' },
      { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. After this window, we begin processing your order and changes cannot be guaranteed. Contact our client services team immediately at hello@veloirnoir.com.' },
      { q: 'How do I track my order?', a: 'Once your order ships, you will receive a confirmation email with a tracking number. You can also view your order status in your account under Order History.' },
      { q: 'Do you offer gift wrapping?', a: 'Yes. All VELOUR NOIR orders are dispatched in our signature black and gold packaging. Additional gift wrapping with a handwritten note can be selected at checkout.' },
    ],
  },
  {
    category: 'SHIPPING',
    items: [
      { q: 'What are your shipping options?', a: 'We offer Standard Shipping (5–7 business days, free over $100), Express Shipping (2–3 business days, $15), and Overnight Shipping (next business day, $35) within the United States. International shipping is available to over 60 countries.' },
      { q: 'Do you ship internationally?', a: 'Yes. International orders typically arrive within 7–14 business days. Duties and taxes may apply depending on your country and are the responsibility of the recipient.' },
      { q: 'Why is my order delayed?', a: 'During peak periods (holidays, new launches), processing times may extend by 1–2 business days. Carrier delays are occasionally outside our control. Contact us if your order is more than 3 business days past its estimated delivery date.' },
    ],
  },
  {
    category: 'RETURNS & EXCHANGES',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns of unused, unopened products within 30 days of delivery. Due to hygiene regulations, opened cosmetics cannot be returned unless defective. Proof of purchase is required.' },
      { q: 'How do I start a return?', a: 'Log into your account, navigate to Order History, and select the item you wish to return. Alternatively, email hello@veloirnoir.com with your order number and reason for return. We will provide a prepaid return label.' },
      { q: 'How long do refunds take?', a: 'Once we receive and inspect your return, refunds are processed within 3–5 business days. The credit will appear on your original payment method within 5–10 business days depending on your bank.' },
      { q: 'Can I exchange a product?', a: 'Yes. If you received the wrong item or a defective product, we will send a replacement immediately at no additional cost. For shade exchanges, please initiate a return and place a new order.' },
    ],
  },
  {
    category: 'PRODUCTS',
    items: [
      { q: 'Are VELOUR NOIR products cruelty-free?', a: 'Yes. All VELOUR NOIR products are 100% cruelty-free. We do not test on animals at any stage of production, and we do not sell in markets that require animal testing.' },
      { q: 'Are your products vegan?', a: 'The majority of our range is vegan. Products containing beeswax or carmine are clearly labelled on their product pages. We are committed to expanding our vegan range with each collection.' },
      { q: 'What skin tones do your shades suit?', a: 'Our shade development process prioritises wearability across the full spectrum of skin tones. Each product page includes shade descriptions and recommendations for light, medium, tan, and deep complexions.' },
      { q: 'Do your products contain parabens or sulphates?', a: 'No. All VELOUR NOIR formulations are free from parabens, sulphates, phthalates, and mineral oil. Full ingredient lists are available on each product page.' },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black pt-[100px]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-cormorant text-[clamp(40px,8vw,72px)] text-white uppercase tracking-[0.05em] font-light leading-none">FAQ</h1>
          <div className="w-10 h-px bg-gold mx-auto mt-6" />
          <p className="font-jost text-[13px] text-muted mt-6">Find answers to our most frequently asked questions below.</p>
        </div>

        {FAQS.map((section) => (
          <div key={section.category} className="mb-12">
            <h2 className="font-jost text-[11px] uppercase tracking-[0.25em] text-gold mb-6 pb-3 border-b border-gold/20">{section.category}</h2>
            <div className="space-y-0">
              {section.items.map((item) => {
                const id = `${section.category}-${item.q}`;
                const isOpen = open === id;
                return (
                  <div key={id} className="border-b border-gold/10">
                    <button
                      onClick={() => setOpen(isOpen ? null : id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between py-5 text-left gap-4"
                    >
                      <span className="font-jost text-[13px] text-platinum hover:text-gold transition-colors pr-4">{item.q}</span>
                      {isOpen ? <Minus size={14} className="text-gold flex-shrink-0" /> : <Plus size={14} className="text-muted flex-shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="pb-5">
                        <p className="font-jost text-[13px] text-muted/90 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-10 border border-gold/20 p-8 text-center">
          <p className="font-jost text-[13px] text-muted mb-4">Can&apos;t find what you&apos;re looking for?</p>
          <a href="/contact" className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold border border-gold/50 px-8 py-3 hover:bg-gold/10 transition-colors inline-block">
            CONTACT US
          </a>
        </div>
      </div>
    </div>
  );
}
