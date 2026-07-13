'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, ChevronRight } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const STEPS = ['INFORMATION', 'SHIPPING', 'PAYMENT'];

const SHIPPING_METHODS = [
  { id: 'standard', label: 'STANDARD SHIPPING', time: '5â€“7 Business Days', price: 0, display: 'FREE (on orders $100+)' },
  { id: 'express', label: 'EXPRESS SHIPPING', time: '2â€“3 Business Days', price: 14.99 },
  { id: 'overnight', label: 'OVERNIGHT', time: 'Next Business Day', price: 29.99 },
];

export default function CheckoutPage() {
  const { state, subtotal, discount, total, dispatch } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [form, setForm] = useState({
    email: '', phone: '', firstName: '', lastName: '',
    address: '', address2: '', city: '', state: '', zip: '', country: 'US',
    cardNumber: '', expiry: '', cvc: '',
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const placeOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    dispatch({ type: 'CLEAR_CART' });
    router.push('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Minimal header */}
      <div className="flex items-center justify-center h-20 border-b border-gold/20 px-4">
        <Link href="/" className="font-cormorant text-[16px] tracking-[0.2em] sm:text-[20px] sm:tracking-[0.4em] text-white uppercase whitespace-nowrap">VELOUR NOIR</Link>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-0 py-6 md:py-8 border-b border-gold/10 px-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-1.5 font-jost text-[10px] md:text-[11px] uppercase tracking-[0.05em] md:tracking-[0.15em] ${
                i === step ? 'text-gold' : i < step ? 'text-muted hover:text-platinum' : 'text-muted/40'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border flex-shrink-0 ${
                i === step ? 'border-gold text-gold' : i < step ? 'border-gold/50 bg-gold/20 text-gold' : 'border-muted/30 text-muted/40'
              }`}>{i + 1}</span>
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < STEPS.length - 1 && <ChevronRight size={10} className="text-muted/30 mx-1.5 md:mx-4 flex-shrink-0" />}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16">
        {/* Form */}
        <div className="space-y-8">
          {step === 0 && (
            <div className="border border-gold/20 p-5 sm:p-8">
              <h2 className="font-cormorant text-[28px] text-white uppercase tracking-[0.05em] mb-6">CONTACT INFORMATION</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="EMAIL ADDRESS" aria-label="Email address" value={form.email} onChange={set('email')} type="email" className="col-span-2" />
                <Input placeholder="PHONE NUMBER" aria-label="Phone number" value={form.phone} onChange={set('phone')} type="tel" className="col-span-2" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="border border-gold/20 p-5 sm:p-8 space-y-6">
              <h2 className="font-cormorant text-[28px] text-white uppercase tracking-[0.05em]">SHIPPING ADDRESS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="FIRST NAME" aria-label="First name" value={form.firstName} onChange={set('firstName')} />
                <Input placeholder="LAST NAME" aria-label="Last name" value={form.lastName} onChange={set('lastName')} />
                <Input placeholder="ADDRESS LINE 1" aria-label="Address line 1" value={form.address} onChange={set('address')} className="col-span-2" />
                <Input placeholder="ADDRESS LINE 2" aria-label="Address line 2" value={form.address2} onChange={set('address2')} className="col-span-2" />
                <Input placeholder="CITY" aria-label="City" value={form.city} onChange={set('city')} />
                <Input placeholder="STATE" aria-label="State" value={form.state} onChange={set('state')} />
                <Input placeholder="ZIP CODE" aria-label="ZIP code" value={form.zip} onChange={set('zip')} />
                <Input placeholder="COUNTRY" aria-label="Country" value={form.country} onChange={set('country')} />
              </div>

              <h3 className="font-cormorant text-[22px] text-white uppercase tracking-[0.05em] mt-8">SHIPPING METHOD</h3>
              <div className="space-y-3">
                {SHIPPING_METHODS.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      shippingMethod === m.id ? 'border-gold bg-gold/5' : 'border-gold/20 hover:border-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" value={m.id} checked={shippingMethod === m.id} onChange={() => setShippingMethod(m.id)} className="accent-gold" />
                      <div>
                        <p className="font-jost text-[12px] uppercase tracking-wider text-platinum">{m.label}</p>
                        <p className="font-jost text-[11px] text-muted">{m.time}</p>
                      </div>
                    </div>
                    <span className="font-jost text-[13px] text-gold">{m.display ?? formatPrice(m.price)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="border border-gold/20 p-5 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-cormorant text-[28px] text-white uppercase tracking-[0.05em]">PAYMENT</h2>
                <div className="flex items-center gap-2 text-muted">
                  <Lock size={14} />
                  <span className="font-jost text-[11px] uppercase tracking-wider">SECURE</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="CARD NUMBER" aria-label="Card number" value={form.cardNumber} onChange={set('cardNumber')} className="col-span-2" maxLength={19} />
                <Input placeholder="MM / YY" aria-label="Expiry date" value={form.expiry} onChange={set('expiry')} />
                <Input placeholder="CVC" aria-label="CVC security code" value={form.cvc} onChange={set('cvc')} maxLength={4} />
              </div>
              <p className="font-jost text-[11px] text-muted">
                Test: 4242 4242 4242 4242 | Any future date | Any CVC
              </p>
              <p className="font-jost text-[11px] text-muted/60 flex items-center gap-1">
                <Lock size={10} /> 256-bit SSL encryption
              </p>
            </div>
          )}

          {step < 2 ? (
            <Button variant="gold" size="lg" className="w-full" onClick={() => setStep((s) => s + 1)}>
              CONTINUE
            </Button>
          ) : (
            <Button variant="gold" size="lg" className="w-full" onClick={placeOrder} disabled={loading}>
              {loading ? 'PROCESSINGâ€¦' : 'COMPLETE ORDER'}
            </Button>
          )}
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-8 self-start border border-gold/20 p-5 sm:p-8">
          <h2 className="font-cormorant text-[22px] text-white uppercase tracking-[0.05em] mb-6">ORDER SUMMARY</h2>
          <div className="space-y-4 mb-8">
            {mounted && state.items.slice(0, 3).map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-14 h-16 bg-deep overflow-hidden flex-shrink-0">
                  <Image src={item.product.images[0]} alt={item.product.name} width={56} height={64} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-jost text-[11px] uppercase tracking-wider text-platinum line-clamp-1">{item.product.name}</p>
                  <p className="font-jost text-[12px] text-gold mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          {mounted && (
            <div className="space-y-2 border-t border-gold/20 pt-4">
              <div className="flex justify-between font-jost text-[12px] text-muted">
                <span>SUBTOTAL</span><span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between font-jost text-[12px] text-gold">
                  <span>DISCOUNT</span><span>âˆ’{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-jost text-[12px] text-muted">
                <span>SHIPPING</span><span className="text-gold">FREE</span>
              </div>
              <div className="border-t border-gold/20 pt-3 flex justify-between items-baseline">
                <span className="font-cormorant text-[20px] text-white uppercase">TOTAL</span>
                <span className="font-cormorant text-[24px] text-gold">{formatPrice(total)}</span>
              </div>
            </div>
          )}
          <div className="mt-6 flex items-center justify-center gap-2 text-muted">
            <Lock size={12} />
            <span className="font-jost text-[11px] uppercase tracking-wider">Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
