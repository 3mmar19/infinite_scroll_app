import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm">{message}</span>
        <button onClick={onClose} className="hover:bg-green-600 rounded p-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
