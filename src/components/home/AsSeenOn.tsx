const PUBLICATIONS = ['VOGUE', "HARPER'S BAZAAR", 'ALLURE', 'CR FASHION BOOK', 'W MAGAZINE'];

export default function AsSeenOn() {
  return (
    <section className="bg-black border-t border-gold/20 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-center gap-2">
        <span className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold mr-8 whitespace-nowrap">AS SEEN ON</span>
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {PUBLICATIONS.map((pub) => (
            <span key={pub} className="font-cormorant text-[13px] uppercase tracking-[0.15em] text-muted hover:text-platinum transition-colors whitespace-nowrap">
              {pub}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
