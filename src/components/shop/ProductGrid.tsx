import ProductCard from './ProductCard';
import { Product } from '@/types';

interface Props { products: Product[]; }

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="text-center">
          <p className="font-cormorant text-[40px] text-white mb-4">No products found</p>
          <p className="font-jost text-[12px] text-muted uppercase tracking-wider">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
