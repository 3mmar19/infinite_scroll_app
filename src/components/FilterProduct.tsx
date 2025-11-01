import { Filter, X } from 'lucide-react';

interface FilterProductProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];

export default function FilterProduct({ selectedCategory, onCategoryChange }: FilterProductProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      {/* Header Section with Title and Clear Button */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Filter by Category</h2>
            <p className="text-sm text-gray-500">Choose a category to refine the product list</p>
          </div>
        </div>
        
        {/* Clear Button - Only show when a category is selected */}
        {selectedCategory !== 'All' && (
          <button
            type="button"
            onClick={() => onCategoryChange('All')}
            className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-500/30'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-200 hover:text-blue-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
