import { Star } from 'lucide-react';
import { Product } from '@/types';

const DUMMY_REVIEWS = [
  { author: 'Amara J.', rating: 5, date: 'Dec 2, 2024', text: 'Absolutely incredible. The pigment is unreal and it wears all day without fading. This is the standard.', skinType: 'Dry', concerns: ['Long wear', 'Drama'] },
  { author: 'Celeste M.', rating: 5, date: 'Nov 28, 2024', text: 'I have never found a product that makes me feel this powerful. Worth every penny and then some.', skinType: 'Combination', concerns: ['Luxury', 'Pigmentation'] },
  { author: 'Priya K.', rating: 4, date: 'Nov 15, 2024', text: 'Stunning formula. Applies beautifully and the color payoff is exactly as described. A little goes a long way.', skinType: 'Oily', concerns: ['Coverage', 'Value'] },
  { author: 'Taylor W.', rating: 5, date: 'Nov 10, 2024', text: 'My go-to product in my entire collection. I have repurchased four times and will continue to do so.', skinType: 'Normal', concerns: ['Everyday', 'Longevity'] },
  { author: 'Jordan P.', rating: 5, date: 'Oct 30, 2024', text: 'I bought this on a whim and now I cannot imagine my routine without it. The quality is exceptional.', skinType: 'Sensitive', concerns: ['Gentle', 'Efficacy'] },
  { author: 'Remi S.', rating: 4, date: 'Oct 22, 2024', text: 'Beautiful product. The packaging alone is stunning, and the formula lives up to the luxury aesthetic.', skinType: 'Dry', concerns: ['Packaging', 'Formula'] },
];

interface Props { product: Product; }

export default function ReviewsSection({ product }: Props) {
  const avgStr = product.rating.toFixed(1);

  return (
    <section className="py-20 border-t border-gold/20">
      <h2 className="font-cormorant text-[48px] text-white uppercase tracking-[0.1em] font-light mb-12">THE VERDICT</h2>

      <div className="flex items-start gap-16 mb-12">
        <div className="text-center">
          <p className="font-cormorant text-[80px] text-gold leading-none">{avgStr}</p>
          <div className="flex gap-1 justify-center my-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="#C8A96E" className="text-gold" />
            ))}
          </div>
          <p className="font-jost text-[11px] text-muted uppercase tracking-wider">{product.reviewCount} Reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DUMMY_REVIEWS.map((r, i) => (
          <div key={i} className="border border-gold/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={12} fill="#C8A96E" className="text-gold" />
                  ))}
                </div>
                <p className="font-jost text-[12px] uppercase tracking-wider text-platinum">{r.author}</p>
                <p className="font-jost text-[10px] text-muted mt-0.5">VERIFIED PURCHASE • {r.date}</p>
              </div>
              <span className="font-jost text-[9px] uppercase tracking-wider text-muted border border-muted/30 px-2 py-1">{r.skinType}</span>
            </div>
            <p className="font-cormorant italic text-[16px] text-white/85 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <button className="font-jost text-[11px] uppercase tracking-wider text-gold border border-gold/50 px-6 py-3 hover:bg-gold/10 transition-colors">
          WRITE A REVIEW
        </button>
        <button className="font-jost text-[11px] uppercase tracking-wider text-muted border border-muted/30 px-6 py-3 hover:border-gold hover:text-gold transition-colors">
          LOAD MORE REVIEWS
        </button>
      </div>
    </section>
  );
}
