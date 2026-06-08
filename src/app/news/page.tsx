import Image from 'next/image';
import Link from 'next/link';

const POSTS = [
  { slug: 'gilded-nirvana-behind-collection', category: 'COLLECTION', title: 'The Gilded Nirvana Collection: Behind the Collection', date: 'December 1, 2024', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', excerpt: 'Step behind the curtain of our most dramatic collection yet. The inspirations, the process, and the pigments.' },
  { slug: 'fashion-week-beauty-backstage', category: 'EDITORIAL', title: 'Fashion Week Beauty: Backstage with VELOUR NOIR', date: 'November 20, 2024', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80', excerpt: 'From Paris to New York, our team was there. Here is what happened when the cameras turned off.' },
  { slug: 'perfect-smoky-eye', category: 'TUTORIAL', title: 'How to Achieve the Perfect Smoky Eye', date: 'November 10, 2024', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80', excerpt: 'The definitive guide to the look that started everything. Step by step, shade by shade.' },
  { slug: 'pigment-technology-science', category: 'SCIENCE', title: 'Pigment Technology: The Science Behind Luxury Color', date: 'October 28, 2024', readTime: '10 min read', image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&q=80', excerpt: 'What separates a $5 eyeshadow from a $128 palette? We break down the science of pigment.' },
  { slug: '5-looks-met-gala-season', category: 'INSPIRATION', title: '5 Looks for the Met Gala Season', date: 'October 15, 2024', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80', excerpt: 'Met Gala season demands maximum drama. These are the five looks that live at that level.' },
  { slug: 'art-of-the-lip-guide', category: 'GUIDE', title: 'The Art of the Lip: A Complete Guide', date: 'October 5, 2024', readTime: '9 min read', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80', excerpt: 'From bare to blinding. Everything you need to know about lips, from prep to the final coat.' },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black pt-[100px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-cormorant text-[clamp(48px,10vw,80px)] text-white uppercase tracking-[0.05em] font-light leading-none">VELOUR NEWS</h1>
          <div className="w-10 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <Link key={post.slug} href={`/news/${post.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <span className="font-jost text-[10px] uppercase tracking-[0.2em] text-gold">{post.category}</span>
              <h2 className="font-cormorant text-[24px] text-white uppercase tracking-[0.03em] font-light leading-tight mt-2 mb-2 group-hover:text-gold-light transition-colors">
                {post.title}
              </h2>
              <p className="font-jost text-[11px] text-muted mb-3">{post.date} · {post.readTime}</p>
              <p className="font-jost text-[13px] text-muted/80 leading-relaxed line-clamp-2">{post.excerpt}</p>
              <span className="block mt-4 font-jost text-[11px] uppercase tracking-[0.2em] text-gold group-hover:text-gold-light transition-colors">
                READ MORE →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
