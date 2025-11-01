import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  onRetry?: () => void;
}

export default function ErrorMessage({ onRetry }: ErrorMessageProps) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600" />
        <p className="text-red-600">Failed to load products</p>
      </div>
      <button
        onClick={onRetry || (() => window.location.reload())}
        className="text-blue-600 hover:text-blue-800 inline-flex items-center justify-center gap-1"
      >
        <RefreshCw className="w-4 h-4" />
        Try again
      </button>
    </div>
  );
}
