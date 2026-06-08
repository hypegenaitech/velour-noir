export default function AnnouncementBar() {
  const text = 'FREE SHIPPING ON ORDERS OVER $100 • NEW: GILDED COLLECTION • VELOUR NOIR × FASHION WEEK • VEGAN & CRUELTY FREE • ';
  return (
    <div className="w-full bg-black border-b border-gold/20 overflow-hidden h-9 flex items-center relative z-50">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="text-gold font-jost text-[11px] uppercase tracking-[0.2em] mx-0">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
