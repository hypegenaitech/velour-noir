export default function BrandStatement() {
  return (
    <section
      className="relative w-full flex items-center justify-center text-center px-8 py-32"
      style={{ background: 'radial-gradient(ellipse at center, rgba(139,26,74,0.15) 0%, #000 70%)' }}
    >
      <div>
        <blockquote
          className="font-cormorant italic font-light text-white leading-tight mb-8"
          style={{ fontSize: 'clamp(32px,6vw,72px)' }}
        >
          "Beauty is not a standard.<br />It is a declaration."
        </blockquote>
        <p className="font-jost text-[11px] uppercase tracking-[0.3em] text-gold">
          VELOUR NOIR — SINCE 2024
        </p>
      </div>
    </section>
  );
}
