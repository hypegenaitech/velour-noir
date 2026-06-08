'use client';
import { useState } from 'react';
import { Shade } from '@/types';

interface Props {
  shades: Shade[];
  selected: Shade | null;
  onChange: (shade: Shade) => void;
}

export default function ShadeSelector({ shades, selected, onChange }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <p className="font-jost text-[11px] uppercase tracking-[0.15em] text-muted mb-3">
        SHADE: <span className="text-platinum">{selected?.name ?? 'SELECT A SHADE'}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {shades.map((shade) => (
          <div key={shade.name} className="relative">
            {hovered === shade.name && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-deep border border-gold/30 px-2 py-1 whitespace-nowrap z-10">
                <span className="font-jost text-[10px] text-platinum">{shade.name}</span>
              </div>
            )}
            <button
              onClick={() => shade.available && onChange(shade)}
              onMouseEnter={() => setHovered(shade.name)}
              onMouseLeave={() => setHovered(null)}
              disabled={!shade.available}
              className={`w-8 h-8 rounded-full transition-all duration-200 relative ${
                selected?.name === shade.name
                  ? 'ring-2 ring-gold ring-offset-2 ring-offset-black scale-110'
                  : 'hover:scale-105'
              } ${!shade.available ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              style={{ background: shade.hex }}
            >
              {!shade.available && (
                <span className="absolute inset-0 rounded-full flex items-center justify-center">
                  <span className="block w-full border-t border-muted/50 rotate-45" />
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
