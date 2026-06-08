'use client';
import Image from 'next/image';
import { useState } from 'react';

interface Props { images: string[]; name: string; }

export default function ImageGallery({ images, name }: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="lg:sticky lg:top-24">
      {/* Main image */}
      <div className="relative w-full aspect-[4/5] bg-deep overflow-hidden">
        <Image
          src={images[selected]}
          alt={name}
          fill
          className="object-contain transition-opacity duration-400"
          priority
        />
        <span className="absolute bottom-4 right-4 font-jost text-[10px] uppercase tracking-wider text-muted/50">ZOOM</span>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`relative w-20 aspect-square flex-shrink-0 overflow-hidden transition-all ${
              selected === i ? 'border border-gold' : 'border border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
