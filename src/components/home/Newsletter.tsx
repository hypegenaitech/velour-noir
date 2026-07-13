'use client';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  return (
    <section
      className="w-full py-24 px-4 md:px-8 border-t border-gold/30 border-b border-gold/30"
      style={{ background: 'radial-gradient(ellipse at center, rgba(200,169,110,0.04) 0%, #000 70%)' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-cormorant text-[56px] text-white uppercase tracking-[0.05em] font-light leading-tight mb-4">
          JOIN THE<br />VELOUR CIRCLE
        </h2>
        <p className="font-jost text-[14px] text-muted mb-10">
          Be first for new launches, exclusive drops, and backstage access.
        </p>
        {done ? (
          <p className="font-cormorant italic text-gold text-xl">Welcome to the Circle. Beauty awaits.</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 text-[12px] tracking-wider"
            />
            <Button type="submit" variant="gold" size="md" className="flex-shrink-0 w-full sm:w-auto">
              SUBSCRIBE
            </Button>
          </form>
        )}
        <p className="font-cormorant italic text-muted text-sm mt-4">No spam. Just beauty.</p>
      </div>
    </section>
  );
}
