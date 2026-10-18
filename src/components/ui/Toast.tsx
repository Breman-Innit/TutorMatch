import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { cn } from "@/lib/cn";

type ToastTone = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastApi {
  show: (message: string, tone?: ToastTone) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const DURATION_MS = 3500;

const toneStyle = {
  success: { Icon: CircleCheck, color: "text-success-ink" },
  error: { Icon: CircleAlert, color: "text-danger-ink" },
  info: { Icon: Info, color: "text-primary-ink" },
} as const;

/** Replaces Android's Toast.makeText. Messages stack at the bottom and dismiss themselves. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), []);

  const show = useCallback(
    (message: string, tone: ToastTone = "info") => {
      const id = nextId.current++;
      setToasts((list) => [...list.slice(-2), { id, message, tone }]);
      window.setTimeout(() => dismiss(id), DURATION_MS);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (m) => show(m, "success"),
      error: (m) => show(m, "error"),
      info: (m) => show(m, "info"),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* --bottom-nav-h is set by the mobile bottom navigation (milestone 4) so toasts clear it. */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(1rem_+_var(--bottom-nav-h,0px)_+_env(safe-area-inset-bottom))] z-[100] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map(({ id, message, tone }) => {
          const { Icon, color } = toneStyle[tone];
          return (
            <button
              key={id}
              type="button"
              onClick={() => dismiss(id)}
              className={cn(
                "pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl border border-line bg-surface",
                "py-3 pr-5 pl-4 text-left text-sm font-medium text-ink shadow-xl animate-toast-in",
              )}
            >
              <Icon size={20} className={cn("shrink-0", color)} aria-hidden="true" />
              {message}
            </button>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
