'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FILTERS = [
  { label: 'CATEGORY', options: ['Face', 'Eyes', 'Lips', 'Cheek', 'Skincare', 'Kits'] },
  { label: 'FINISH', options: ['Matte', 'Satin', 'Gloss', 'Shimmer', 'Glitter'] },
  { label: 'SKIN TYPE', options: ['All', 'Oily', 'Dry', 'Combination', 'Sensitive'] },
];

interface Props {
  active: Record<string, string[]>;
  onChange: (key: string, val: string) => void;
}

export default function FilterSidebar({ active, onChange }: Props) {
  const [open, setOpen] = useState<string[]>(['CATEGORY']);

  const toggle = (label: string) =>
    setOpen((prev) => prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]);

  return (
    <aside className="w-60 flex-shrink-0 border-r border-gold/20 pr-6">
      {FILTERS.map((f) => (
        <div key={f.label} className="border-b border-gold/10 py-4">
          <button
            className="w-full flex items-center justify-between font-jost text-[11px] uppercase tracking-[0.15em] text-gold"
            onClick={() => toggle(f.label)}
          >
            {f.label}
            <ChevronDown size={12} className={`transition-transform ${open.includes(f.label) ? 'rotate-180' : ''}`} />
          </button>
          {open.includes(f.label) && (
            <div className="mt-3 space-y-2">
              {f.options.map((opt) => {
                const isActive = active[f.label]?.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => onChange(f.label, opt)}
                    className={`block w-full text-left font-jost text-[12px] px-3 py-1.5 transition-colors ${
                      isActive ? 'bg-gold text-black' : 'text-muted hover:text-platinum'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Rating */}
      <div className="border-b border-gold/10 py-4">
        <p className="font-jost text-[11px] uppercase tracking-[0.15em] text-gold mb-3">RATING</p>
        <button
          onClick={() => onChange('RATING', '4+')}
          className={`font-jost text-[12px] px-3 py-1.5 transition-colors ${
            active['RATING']?.includes('4+') ? 'bg-gold text-black' : 'text-muted hover:text-platinum'
          }`}
        >
          4★ & above
        </button>
      </div>
    </aside>
  );
}
