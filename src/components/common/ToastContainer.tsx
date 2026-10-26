import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-[#275C98] dark:text-[#A4CCFF]" />;
        let borderClass = 'border-[#275C98]/30';
        let bgClass = 'bg-[#EFF5F8] dark:bg-[#21323D]';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-[#176652] dark:text-[#8EE0C5]" />;
          borderClass = 'border-[#176652]/40';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-[#955716] dark:text-[#FFCE8A]" />;
          borderClass = 'border-[#955716]/40';
        } else if (toast.type === 'urgent') {
          icon = <AlertCircle className="w-5 h-5 text-[#9B3946] dark:text-[#FFA8AC] animate-bounce" />;
          borderClass = 'border-[#9B3946] border-2';
          bgClass = 'bg-[#FFF5F5] dark:bg-[#3D1A1E]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl shadow-lg border ${borderClass} ${bgClass} transition-all transform animate-in slide-in-from-bottom duration-200`}
            style={{
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-[#172B3A] dark:text-[#F2F7F8] leading-tight">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] mt-0.5 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#5B7180] hover:text-[#172B3A] dark:hover:text-[#F2F7F8] p-1 -mr-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
