import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const POSTS = [
  {
    slug: 'gilded-nirvana-behind-collection',
    category: 'COLLECTION',
    title: 'The Gilded Nirvana Collection: Behind the Collection',
    date: 'December 1, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80',
    excerpt: 'Step behind the curtain of our most dramatic collection yet. The inspirations, the process, and the pigments.',
    body: [
      { type: 'p', text: 'Every great collection begins with a single obsession. For Gilded Nirvana, it was the idea of transformation — not just of the face, but of the self. We wanted to create something that felt ancient and futuristic at once, rooted in the opulence of old gold and the precision of modern pigment technology.' },
      { type: 'h2', text: 'The Inspiration' },
      { type: 'p', text: 'Our creative director spent three weeks in Istanbul, photographing Byzantine mosaics at dawn. The way gold tesserae catch light at different angles — sometimes warm, sometimes almost white — became the visual DNA of this entire collection. Every shade was chosen to echo that quality.' },
      { type: 'p', text: 'We also drew deeply from the Mughal miniature tradition, where gold leaf was ground into pigment and applied with a single hair. The level of craft involved in those centuries-old works directly informed our approach to shade development for this launch.' },
      { type: 'h2', text: 'The Pigments' },
      { type: 'p', text: 'Each of the 18 shades in the Gilded Nirvana palette took between 4 and 11 months to develop. Our lead chemist describes the process as "controlled obsession." The signature gold-shift pigments are triple-milled to a fineness that most cosmetic manufacturers consider economically unfeasible. We consider it non-negotiable.' },
      { type: 'p', text: 'The collection\'s hero shade — Nirvana Gilt — contains an actual 24-karat gold micro-flake component. Applied wet, it reads as liquid gold. Applied dry, it becomes a diffused luminescence that builds across the lid.' },
      { type: 'h2', text: 'The Process' },
      { type: 'p', text: 'Gilded Nirvana took 22 months from initial concept to finished product. Three full formulations were rejected before we arrived at the texture profile we wanted: butter-soft but buildable, pigmented enough for a single-coat statement but blendable enough for a diffused wash of colour.' },
      { type: 'p', text: 'We are proud of every product we release. But Gilded Nirvana is something else. It is the collection we made for the version of you that refuses to be ordinary.' },
    ],
  },
  {
    slug: 'fashion-week-beauty-backstage',
    category: 'EDITORIAL',
    title: 'Fashion Week Beauty: Backstage with VELOUR NOIR',
    date: 'November 20, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=80',
    excerpt: 'From Paris to New York, our team was there. Here is what happened when the cameras turned off.',
    body: [
      { type: 'p', text: 'Fashion week beauty is a different discipline entirely. You have twelve minutes, fluorescent lighting, and a model who has already had her makeup done and undone three times. You work with what you have — and you make it extraordinary.' },
      { type: 'h2', text: 'Paris: The Smoke and the Speed' },
      { type: 'p', text: 'Our Paris team worked three shows in a single day during the final week of collections. The call sheet said "understated elegance." The creative director said "make it look like she\'s been crying diamonds." These two briefs are not unrelated.' },
      { type: 'p', text: 'The MatteTrance Lipstick in Requiem became the hero product of the Paris leg. Fourteen looks, all built around that one shade. It reads differently under every light — deeply burgundy backstage, almost brown under runway lights, and somewhere between the two in photographs.' },
      { type: 'h2', text: 'New York: The Ground Floor' },
      { type: 'p', text: 'New York was about texture. Three designers specifically requested VELOUR NOIR\'s Glass Veil Serum as the base for their beauty looks. When a makeup artist builds an entire collection look around your base product, you know you\'ve done something right.' },
      { type: 'p', text: 'The backstage at one downtown show became something of a masterclass in restraint. The lead artist used only four VELOUR NOIR products across 24 models, varying application technique rather than product selection. The results were singular and deeply individual — which is the point.' },
      { type: 'h2', text: 'What We Learned' },
      { type: 'p', text: 'Fashion week teaches you that great makeup is about confidence, not coverage. The products that perform best under pressure are the ones that trust the wearer — formulas that adapt rather than impose, that enhance rather than conceal.' },
    ],
  },
  {
    slug: 'perfect-smoky-eye',
    category: 'TUTORIAL',
    title: 'How to Achieve the Perfect Smoky Eye',
    date: 'November 10, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80',
    excerpt: 'The definitive guide to the look that started everything. Step by step, shade by shade.',
    body: [
      { type: 'p', text: 'The smoky eye is not a look. It is a language. Every version — from the smudged kohl of the 1960s to the architectural graphite constructions of contemporary editorial — is a different dialect of the same essential statement: intensity, intentionality, and the willingness to be looked at.' },
      { type: 'h2', text: 'Step 1: The Base' },
      { type: 'p', text: 'Prime the lid with a flat concealer or dedicated eye primer. This is not optional. Without a base, your pigments will migrate into the crease within two hours and the whole architecture collapses. Apply with a fingertip, press don\'t drag, and set with a fine translucent powder.' },
      { type: 'h2', text: 'Step 2: The First Shadow Layer' },
      { type: 'p', text: 'Choose your mid-tone first. This is your architectural shade — the one that defines the crease and sets the depth of the look. Apply with a fluffy blending brush in small windshield-wiper motions, working slightly above the natural crease. Build slowly. You can always add; you cannot subtract.' },
      { type: 'h2', text: 'Step 3: Depth and Dimension' },
      { type: 'p', text: 'Now take your darkest shade and a small, dense brush. Apply to the outer third of the lid and the outer corner of the lower lash line. Blend upward and outward — never straight up, always at an angle. This is where the drama lives.' },
      { type: 'h2', text: 'Step 4: The Inner Corner' },
      { type: 'p', text: 'A small amount of the palest shade in your palette, pressed into the inner corner with a fingertip, opens the eye in a way no eyeliner can match. It is the negative space that gives the dark shades their weight.' },
      { type: 'h2', text: 'Step 5: The Liner' },
      { type: 'p', text: 'Line the waterline with a black kohl pencil. Smudge immediately with a small brush. The line should disappear into the lashes, not sit on top of them. This is the difference between "lined eyes" and "smoky eyes." On the upper lid, a thin line along the lash line — again smudged — deepens the overall effect without looking applied.' },
      { type: 'h2', text: 'Step 6: Mascara' },
      { type: 'p', text: 'Two coats of volumising mascara. Allow the first coat to dry fully before applying the second. Comb through with a clean mascara wand if needed. The lashes should look full and dark, not clumped.' },
    ],
  },
  {
    slug: 'pigment-technology-science',
    category: 'SCIENCE',
    title: 'Pigment Technology: The Science Behind Luxury Color',
    date: 'October 28, 2024',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1200&q=80',
    excerpt: 'What separates a $5 eyeshadow from a $128 palette? We break down the science of pigment.',
    body: [
      { type: 'p', text: 'The question we hear most often is this: what actually justifies the price difference between a drugstore eyeshadow and a luxury palette? The answer is not marketing. It is not packaging, though packaging matters for protection and experience. The answer is pigment — its origin, its refinement, and the engineering required to make it behave in a compact.' },
      { type: 'h2', text: 'Raw Material Origins' },
      { type: 'p', text: 'Luxury cosmetic pigments are typically iron oxides, micas, and ultramarines of pharmaceutical or cosmetic grade. The difference between cosmetic-grade and industrial-grade iron oxide is particle size consistency and the absence of heavy metal contamination. Smaller, more uniform particles reflect light more predictably and create smoother colour payoff on skin.' },
      { type: 'h2', text: 'Milling: The Hidden Variable' },
      { type: 'p', text: 'Triple-milling is the process by which raw pigment and binder are forced through rollers at high pressure three times. Each pass reduces particle size and increases homogeneity. A double-milled shadow will feel slightly gritty; a triple-milled shadow will feel like silk. The difference in cost per unit is significant. The difference in performance is transformative.' },
      { type: 'h2', text: 'Binders and Their Role' },
      { type: 'p', text: 'The binder — typically a combination of dimethicone, ester waxes, and polymers — determines how the pigment adheres to skin, how it transfers from the pan, and how long it lasts. Cheap binders use mineral oil derivatives that sit on top of the skin and migrate. Quality binders create a breathable film that moves with the skin and resists crease.' },
      { type: 'h2', text: 'Colour Shift Pigments' },
      { type: 'p', text: 'The multichromatic pigments responsible for shade-shifting effects are among the most expensive materials in cosmetic chemistry. They work by layering ultra-thin films of metal oxide over a mica substrate. As light strikes these layers at different angles, it creates interference patterns that the eye reads as different colours. The consistency of this effect requires extremely precise control of film thickness — a process measured in nanometres.' },
      { type: 'h2', text: 'Why It Matters' },
      { type: 'p', text: 'When you invest in a luxury pigment product, you are paying for decades of cosmetic chemistry research, pharmaceutical-grade raw materials, manufacturing processes that would be economically irrational at a mass-market price point, and a formulation team that treats colour accuracy as a non-negotiable standard. That is what the price is for.' },
    ],
  },
  {
    slug: '5-looks-met-gala-season',
    category: 'INSPIRATION',
    title: '5 Looks for the Met Gala Season',
    date: 'October 15, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80',
    excerpt: 'Met Gala season demands maximum drama. These are the five looks that live at that level.',
    body: [
      { type: 'p', text: 'There is a particular category of beauty that exists only for evenings that demand to be remembered. Not every occasion merits full ceremony. But some do — and for those, restraint is the wrong tool.' },
      { type: 'h2', text: 'Look 1: The Gilded Widow' },
      { type: 'p', text: 'Start with a full-coverage matte base. Build the eye with the darkest shadows in the Gilded Nirvana palette, concentrating depth at the outer corners and along the lower lash line. A precise wing in liquid black. No blush, no highlighter. The sole concession to light: a single coat of Nirvana Gilt on the centre of the upper lid.' },
      { type: 'h2', text: 'Look 2: Celestial Overload' },
      { type: 'p', text: 'Every product, every surface. Start with a luminous base, apply highlighter to the brow bone, inner corner, nose bridge, Cupid\'s bow, and cheekbones. Use our galaxy-shift pigments on the lid, applied wet for maximum intensity. Pair with a glossy lip in a shade that reads as nude in daylight and rose under artificial light.' },
      { type: 'h2', text: 'Look 3: The Power Pout' },
      { type: 'p', text: 'Bare eyes, meticulously groomed brows, faultless skin — and the MatteTrance in Requiem applied with a flat brush, lip liner slightly overdrawing the natural edge, blotted once and reapplied. The lip becomes the entire look. Everything else is architecture in service of it.' },
      { type: 'h2', text: 'Look 4: Graphic Drama' },
      { type: 'p', text: 'Graphic liner is having its cultural moment and shows no signs of retreating. A floating liner above the crease, geometric outer corner shapes, deconstructed wings — this look rewards a steady hand and punishes hesitation. Build it in steps: sketch first with a soft pencil, then trace precisely with liquid liner.' },
      { type: 'h2', text: 'Look 5: The Editorial Nude' },
      { type: 'p', text: 'The most demanding look on this list. A true editorial nude requires skin that reads as skin, not as makeup over skin. It requires brows that look grown, not drawn. It requires a lip that is two shades more interesting than nothing but appears effortless. The technique is invisible. That is the entire achievement.' },
    ],
  },
  {
    slug: 'art-of-the-lip-guide',
    category: 'GUIDE',
    title: 'The Art of the Lip: A Complete Guide',
    date: 'October 5, 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80',
    excerpt: 'From bare to blinding. Everything you need to know about lips, from prep to the final coat.',
    body: [
      { type: 'p', text: 'The lip is the most expressive surface on the face. It moves, it speaks, it smiles, it sets. No other feature commands attention with the same immediacy, and no other feature is more frequently done poorly. This guide exists to change that.' },
      { type: 'h2', text: 'Preparation: The Surface Matters' },
      { type: 'p', text: 'Dry, flaky lips will not hold colour evenly regardless of how good the formula is. Exfoliate weekly with a sugar scrub or a dry toothbrush. Apply a balm 20 minutes before application and blot thoroughly before beginning. This is not optional. This is the foundation.' },
      { type: 'h2', text: 'Liner: The Architecture' },
      { type: 'p', text: 'Lip liner has two functions: it defines the edge of the lip and it creates a base that prevents feathering. Use a shade that matches your lipstick exactly or is one shade darker. Begin at the Cupid\'s bow, working downward to each corner. Then line the lower lip from corner to corner in a single stroke if possible — this creates a cleaner line than multiple short strokes.' },
      { type: 'h2', text: 'Application: The Method Matters' },
      { type: 'p', text: 'For precise application, a lip brush always outperforms direct application from the bullet. Load the brush and apply from the centre outward, following the line you\'ve already established. Blot with a single layer of tissue, then reapply for longevity. For a matte finish, dust the barest amount of translucent powder over the blotted colour before reapplying.' },
      { type: 'h2', text: 'Gloss: The Finishing Variable' },
      { type: 'p', text: 'A gloss applied over a matte lipstick changes its character entirely. A clear gloss adds dimension without changing hue. A tinted gloss can shift warm or cool depending on the base. Applied to the centre of the lower lip only, it creates a fullness effect. Applied all over, it reads as wet, which is a different register entirely.' },
      { type: 'h2', text: 'Longevity: Making It Last' },
      { type: 'p', text: 'The blot-and-reapply method is the most effective longevity technique for any lip product. For events where retouching is impossible, apply liner all over the lip as a base before your lipstick — this dramatically extends wear time. Avoid oily foods for the first 30 minutes after application to allow the formula to fully set.' },
    ],
  },
];

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export default function NewsArticle({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-black pt-[100px]">
      {/* Hero image */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 md:px-8 pb-12">
          <span className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold block mb-3">{post.category}</span>
          <h1 className="font-cormorant text-[clamp(28px,5vw,52px)] text-white uppercase tracking-[0.04em] font-light leading-tight">
            {post.title}
          </h1>
          <p className="font-jost text-[12px] text-muted mt-3">{post.date} · {post.readTime}</p>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        <p className="font-cormorant italic text-[20px] text-gold leading-relaxed mb-10 border-l-2 border-gold/50 pl-6">
          {post.excerpt}
        </p>

        <div className="space-y-6">
          {post.body.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="font-cormorant text-[28px] text-white uppercase tracking-[0.05em] font-light mt-10 mb-2">
                  {block.text}
                </h2>
              );
            }
            return (
              <p key={i} className="font-jost text-[14px] text-muted/90 leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-gold/20">
          <Link href="/news" className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors">
            ← BACK TO VELOUR NEWS
          </Link>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="border-t border-gold/20 py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h3 className="font-cormorant text-[32px] text-white uppercase tracking-[0.1em] font-light mb-10 text-center">MORE FROM VELOUR NEWS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.slug} href={`/news/${p.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <span className="font-jost text-[10px] uppercase tracking-[0.2em] text-gold">{p.category}</span>
                  <h4 className="font-cormorant text-[20px] text-white uppercase tracking-[0.03em] font-light leading-tight mt-1 mb-1 group-hover:text-gold-light transition-colors">
                    {p.title}
                  </h4>
                  <p className="font-jost text-[11px] text-muted">{p.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
