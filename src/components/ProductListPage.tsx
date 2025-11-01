import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useProducts, triggerRetry } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import Toast from './Toast';
import Header from './Header';
import FilterProduct from './FilterProduct';

//------------------------------------ Main Product List Page Component ----------------------------------
export default function ProductListPage() {
  //------------------------------------ State Management ----------------------------------
  const [cartCount, setCartCount] = useState(0); // Counter for cart items
  const [showToast, setShowToast] = useState(false); // Show/hide toast notification
  const [toastMessage, setToastMessage] = useState(''); // Toast message text
  const [searchQuery, setSearchQuery] = useState(''); // Search input value
  const [selectedCategory, setSelectedCategory] = useState('All'); // By Default it will be all
  
  //------------------------------------ Fetch Products with React Query ----------------------------------
  const {
    data,                // All pages of products
    fetchNextPage,       // Function to load next page
    hasNextPage,         // Boolean: more pages available?
    isFetchingNextPage,  // Boolean: currently loading next page?
    isLoading,           // Boolean: initial loading?
    isError              // Boolean: error occurred?
  } = useProducts(searchQuery, selectedCategory);

  //------------------------------------ This is Library For Infinite Scroll ----------------------------------
  const { ref, inView } = useInView({
    threshold: 0,  // Trigger as soon as element is visible
  });

  //------------------------------------ Add to Cart Handler ----------------------------------
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setToastMessage('Product added to cart successfully!');
    setShowToast(true);
  };

  //------------------------------------ Load next page when sentinel is in view ----------------------------------
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isError) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, isError, fetchNextPage]);

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
      
      {/* Header with Search and Cart */}
      <Header 
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClear={() => setSearchQuery('')}
      />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
        {/* Category Filter */}
        <FilterProduct 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        {/* Loading State - Initial Load */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        
        /* Empty State - No Results Found */
        ) : data?.pages[0]?.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No Result found for "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          </div>
        
        /* Product Grid - Show Products */
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Loop through all pages and products */}
              {data?.pages.map((page) =>
                page.items.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))
              )}
            </div>

            {/* Sentinel Element*/}
            <div ref={ref} className="text-center py-8">
              {/* Loading Next Page */}
              {isFetchingNextPage && <LoadingSpinner />}
              
              {/* Error State - Show retry button */}
              {isError && !isFetchingNextPage && (
                <ErrorMessage 
                  onRetry={() => {
                    triggerRetry(); 
                    fetchNextPage(); // When click on retry button, it will load next page
                  }} 
                />
              )}
              
              {/* End of List - No more products */}
              {!hasNextPage && !isError && data && data.pages[0]?.items.length > 0 && (
                <p className="text-gray-500">No more products to load</p>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
