'use client';
import { useState } from 'react';
import { Mail, MessageSquare, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-black pt-[100px]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-cormorant text-[clamp(40px,8vw,72px)] text-white uppercase tracking-[0.05em] font-light leading-none">CONTACT US</h1>
          <div className="w-10 h-px bg-gold mx-auto mt-6" />
          <p className="font-jost text-[13px] text-muted mt-6 max-w-md mx-auto leading-relaxed">
            Our client services team is here for you. Expect a response within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
          {/* Form */}
          <div>
            {sent ? (
              <div className="border border-gold/30 p-10 text-center">
                <div className="w-12 h-12 border border-gold flex items-center justify-center mx-auto mb-4">
                  <Mail size={20} className="text-gold" />
                </div>
                <h2 className="font-cormorant text-[28px] text-white uppercase tracking-[0.05em] font-light mb-3">Message Received</h2>
                <p className="font-jost text-[13px] text-muted leading-relaxed">
                  Thank you for reaching out. A member of our team will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-jost text-[10px] uppercase tracking-[0.2em] text-gold mb-2">Full Name *</label>
                    <input required value={form.name} onChange={set('name')} aria-label="Full name"
                      className="w-full bg-deep border border-gold/30 text-platinum placeholder-muted/40 px-4 h-12 font-jost text-sm focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block font-jost text-[10px] uppercase tracking-[0.2em] text-gold mb-2">Email Address *</label>
                    <input required type="email" value={form.email} onChange={set('email')} aria-label="Email address"
                      className="w-full bg-deep border border-gold/30 text-platinum placeholder-muted/40 px-4 h-12 font-jost text-sm focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block font-jost text-[10px] uppercase tracking-[0.2em] text-gold mb-2">Subject *</label>
                  <select required value={form.subject} onChange={set('subject')} aria-label="Subject"
                    className="w-full bg-deep border border-gold/30 text-platinum px-4 h-12 font-jost text-sm focus:outline-none focus:border-gold transition-colors">
                    <option value="">Select a topic</option>
                    <option>Order Enquiry</option>
                    <option>Returns & Exchanges</option>
                    <option>Product Question</option>
                    <option>Press & Partnerships</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-jost text-[10px] uppercase tracking-[0.2em] text-gold mb-2">Message *</label>
                  <textarea required value={form.message} onChange={set('message')} rows={6} aria-label="Message"
                    className="w-full bg-deep border border-gold/30 text-platinum placeholder-muted/40 px-4 py-3 font-jost text-sm focus:outline-none focus:border-gold transition-colors resize-none" />
                </div>
                <button type="submit" className="font-jost text-[11px] uppercase tracking-[0.2em] bg-gold text-black px-12 py-4 hover:bg-gold-light transition-colors">
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            {[
              { icon: Mail, title: 'EMAIL', lines: ['hello@veloirnoir.com', 'press@veloirnoir.com'] },
              { icon: MessageSquare, title: 'LIVE CHAT', lines: ['Available Monday–Friday', '9am–6pm GMT'] },
              { icon: Clock, title: 'RESPONSE TIME', lines: ['Within 24 hours', 'Priority for order issues'] },
              { icon: MapPin, title: 'HEAD OFFICE', lines: ['VELOUR NOIR Ltd.', '12 Mayfair Place', 'London, W1K 3AB'] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={15} className="text-gold" />
                </div>
                <div>
                  <p className="font-jost text-[10px] uppercase tracking-[0.2em] text-gold mb-1">{title}</p>
                  {lines.map((l) => <p key={l} className="font-jost text-[12px] text-muted leading-relaxed">{l}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
