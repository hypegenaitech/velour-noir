const TEXT = '• VELOUR NOIR  •  NEW GILDED NIRVANA COLLECTION  •  AS SEEN AT FASHION WEEK  •  FREE SHIPPING $100+  •  VEGAN FORMULAS  •  CRUELTY FREE  •';

export default function Ticker() {
  return (
    <div className="w-full bg-black border-t border-gold/30 border-b border-gold/30 h-12 flex items-center overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee-slow">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold mx-0">{TEXT}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        ))}
      </div>
    </div>
  );
}
