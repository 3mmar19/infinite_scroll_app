import { Loader2Icon } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader2Icon className="animate-spin w-6 h-6 text-blue-600" />
      <span>Loading products...</span>
    </div>
  );
}
