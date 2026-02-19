import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export type ToastState = {
  message: string;
  type: ToastType;
} | null;

export default function Toast({ toast, onClose }: { toast: ToastState; onClose: () => void }) {
  if (!toast) return null;

  const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'error' ? AlertCircle : Info;

  return (
    <div className={`toast-shell toast-${toast.type} load-fade-up`} role="status" aria-live="polite">
      <div className="flex items-center gap-2">
        <Icon size={18} />
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
      <button onClick={onClose} className="toast-close" aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}
