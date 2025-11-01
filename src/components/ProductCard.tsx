import { Product } from '../mocks/types';
import { ShoppingCart, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

//------------------------------------ Product Card Component ----------------------------------
export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  //------------------------------------ Fade-in animation when card becomes visible ----------------------------------
  const { ref, inView } = useInView({
    triggerOnce: true,  // Products after appearing will not animate again
    threshold: 0.1,     // Products will animate when 10% of them are visible
  });

  return (
    <div
      ref={ref} 
      className={`bg-white rounded-lg shadow hover:shadow-lg transition-all duration-500 border border-gray-200 ${
        inView ? 'opacity-100' : 'opacity-0'  // items will be visible when they are in view
      }`}
    >
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Price Badge */}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow">
          <span className="text-xs font-bold text-blue-600">{product.price} SAR</span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-3">
        {/* Product Name */}
        <h3 className="text-sm font-bold text-gray-900 mb-2">
          {product.name}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-3 h-3 ${
                index < product.rating
                  ? 'fill-yellow-400 text-yellow-400'  // Filled star
                  : 'fill-gray-200 text-gray-200'      // Empty star
              }`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">({product.rating}.0)</span>
        </div>

        {/* Product Description */}
        <p className="text-gray-600 text-xs mb-3">
          {product.description}
        </p>

        {/* Add to Cart Button */}
        <button 
          onClick={onAddToCart}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-full flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="font-medium uppercase">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
