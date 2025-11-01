import { Package } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Package className="w-4 h-4" />
          <p>© 2025 Product Store</p>
        </div>
        <p className="text-sm text-gray-400">React Infinite Scroll Store</p>
      </div>
    </footer>
  );
}
