'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Product } from '@/types';

interface Section { label: string; content: React.ReactNode; }

export default function AccordionInfo({ product }: { product: Product }) {
  const [open, setOpen] = useState<string | null>('THE FORMULA');

  const sections: Section[] = [
    { label: 'THE FORMULA', content: <p className="font-jost text-[13px] text-muted leading-relaxed whitespace-pre-line">{product.description}</p> },
    {
      label: 'KEY INGREDIENTS',
      content: (
        <div className="grid grid-cols-2 gap-4">
          {product.ingredients.map((ing) => (
            <div key={ing.name} className="border border-gold/20 p-4">
              <p className="font-jost text-[11px] uppercase tracking-wider text-gold mb-1">{ing.name}</p>
              <p className="font-jost text-[12px] text-muted">{ing.benefit}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'HOW TO USE',
      content: (
        <ol className="space-y-2">
          {product.howToUse.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-cormorant text-gold text-[16px] flex-shrink-0">{i + 1}.</span>
              <p className="font-jost text-[13px] text-muted">{step}</p>
            </li>
          ))}
        </ol>
      ),
    },
    {
      label: 'DELIVERY & RETURNS',
      content: (
        <div className="space-y-3 font-jost text-[13px] text-muted">
          <p>Free standard shipping on orders over $100. Express and overnight options available at checkout.</p>
          <p>Returns accepted within 30 days of purchase. Unused, unopened products only. Contact support to initiate a return.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-gold/20">
      {sections.map((s) => (
        <div key={s.label} className="border-b border-gold/20">
          <button
            className="w-full flex items-center justify-between py-4 font-jost text-[11px] uppercase tracking-[0.15em] text-platinum hover:text-gold transition-colors"
            onClick={() => setOpen(open === s.label ? null : s.label)}
          >
            {s.label}
            {open === s.label ? <Minus size={14} className="text-gold" /> : <Plus size={14} />}
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === s.label ? 'max-h-[600px] pb-5' : 'max-h-0'}`}>
            {s.content}
          </div>
        </div>
      ))}
    </div>
  );
}
