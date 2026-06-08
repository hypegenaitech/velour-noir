'use client';
import { useUI } from '@/context/UIContext';
import { X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useUI();
  return (
    <div className="fixed bottom-6 right-6 z-[99998] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-deep border border-gold/40 px-5 py-4 min-w-[280px] shadow-2xl animate-fade-up"
        >
          <div className="w-1 h-full bg-gold absolute left-0 top-0 bottom-0" />
          <span className="font-jost text-[12px] uppercase tracking-wider text-platinum flex-1">{t.message}</span>
          <button onClick={() => removeToast(t.id)} aria-label="Dismiss notification" className="text-muted hover:text-gold transition-colors">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
