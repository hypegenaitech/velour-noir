'use client';
import { Minus, Plus } from 'lucide-react';

interface Props { value: number; onChange: (n: number) => void; }

export default function QuantitySelector({ value, onChange }: Props) {
  return (
    <div className="flex items-center border border-gold/30 h-10 w-fit">
      <button onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity" className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors">
        <Minus size={12} />
      </button>
      <span className="w-12 text-center font-jost text-[14px] text-platinum">{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="Increase quantity" className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors">
        <Plus size={12} />
      </button>
    </div>
  );
}
