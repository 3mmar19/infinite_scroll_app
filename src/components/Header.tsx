import { ShoppingCart } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeaderProps {
  cartCount: number;                        // Number of items in cart
  searchQuery: string;                      // Current search query
  onSearchChange: (value: string) => void;  // Handler for search input
  onSearchClear: () => void;                // Handler to clear search
}

// Cart Icon Component - Reusable
function CartIcon({ cartCount, className = '' }: { cartCount: number; className?: string }) {
  return (
    <button
      type="button"
      className={`relative flex items-center justify-center rounded-full border border-blue-100 bg-white/80 p-2 text-blue-600 shadow-sm transition-all hover:bg-blue-50 ${className}`}
    >
      <ShoppingCart className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-bounce">
          {cartCount}
        </span>
      )}
    </button>
  );
}

export default function Header({ cartCount, searchQuery, onSearchChange, onSearchClear }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-blue-100 bg-white/90 backdrop-blur-sm shadow">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left Section: Logo and Mobile Cart */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 shadow-sm">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-blue-700">Product Store</h1>
                <p className="hidden sm:block text-gray-500 text-xs">Discover amazing products</p>
              </div>
            </div>
            
            {/* Cart Icon - Mobile Only */}
            <CartIcon cartCount={cartCount} className="md:hidden" />
          </div>
          
          {/* Right Section: Search Bar and Desktop Cart */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Bar Component */}
            <SearchBar 
              value={searchQuery}
              onChange={onSearchChange}
              onClear={onSearchClear}
            />
            
            {/* Cart Icon - Desktop Only */}
            <CartIcon cartCount={cartCount} className="hidden md:block flex-shrink-0" />
          </div>
        </div>
      </div>
    </header>
  );
}
