import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;                      // Current search input value
  onChange: (value: string) => void;  // Handler when user types
  onClear: () => void;                // Handler to clear search
}

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="w-full md:w-80">
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-gray-400">
          <Search className="w-4 h-4" />
        </span>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-2xl border border-gray-200 bg-white/80 py-2.5 pl-10 pr-10 text-sm text-gray-800 shadow-sm transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-600"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
