import { Star } from 'lucide-react';

const REVIEWS = [
  {
    stars: 5,
    text: '"The MatteTrance in Requiem is unlike anything I have ever put on my lips. The pigment, the finish, the way it makes me feel — this is art in a bullet."',
    name: 'Amara J.',
    type: 'Dry skin',
    product: 'MatteTrance Lipstick',
  },
  {
    stars: 5,
    text: '"The Mothership I palette changed my entire relationship with eyeshadow. I used to be afraid of pigment this intense. Now I am addicted."',
    name: 'Celeste M.',
    type: 'Combination skin',
    product: 'Mothership I Palette',
  },
  {
    stars: 5,
    text: '"Skin Fetish Foundation is the only foundation I have ever tried that makes my skin look better than itself. The blur is real. The glow is real. I am obsessed."',
    name: 'Sasha R.',
    type: 'Oily skin',
    product: 'Skin Fetish Foundation',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-black py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-cormorant text-[48px] text-white uppercase tracking-[0.1em] font-light">THE VERDICT</h2>
          <div className="w-10 h-px bg-gold mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((r, i) => (
            <div key={i} className="border border-gold/30 p-8">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} size={14} fill="#C8A96E" className="text-gold" />
                ))}
              </div>
              <blockquote className="font-cormorant italic text-[18px] text-white leading-relaxed mb-6">{r.text}</blockquote>
              <div>
                <p className="font-jost text-[11px] uppercase tracking-wider text-platinum">{r.name}</p>
                <p className="font-jost text-[10px] text-muted mt-1">VERIFIED PURCHASE • {r.type.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
