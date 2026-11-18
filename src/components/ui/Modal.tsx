import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import type { IconComponent } from "@/components/icons";
import { cn } from "@/lib/cn";
import { IconButton } from "./IconButton";
import { IconTile } from "./IconTile";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Optional icon shown in a gradient tile before the title. */
  icon?: IconComponent;
  children: ReactNode;
  /** Action buttons, aligned to the right. */
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const widths = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-xl" };

/**
 * Built on the native <dialog> element, which gives us focus trapping, Escape-to-close
 * and a backdrop for free. Content mounts only while open, so forms reset each time.
 */
export function Modal({ open, onClose, title, icon, children, footer, size = "md" }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Stop the page behind the dialog from scrolling.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      // Fires on Escape and on dialog.close(); only report it if the parent still thinks we're open.
      onClose={() => open && onClose()}
      // A click on the backdrop lands on the <dialog> element itself.
      onClick={(e) => e.target === ref.current && onClose()}
      className={cn(
        "m-auto w-[calc(100%-2rem)] overflow-hidden rounded-3xl border border-line bg-surface p-0 text-ink",
        "shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-sm open:animate-pop-in",
        widths[size],
      )}
    >
      {open && (
        <div className="flex max-h-[85dvh] flex-col">
          <header className="flex items-center gap-3 px-6 pt-6 pb-2">
            {icon && <IconTile icon={icon} filled size={40} round />}
            <h2 id={titleId} className="flex-1 text-lg font-bold">
              {title}
            </h2>
            <IconButton label="Close" onClick={onClose} className="-mr-2">
              <X size={20} />
            </IconButton>
          </header>
          <div className="overflow-y-auto px-6 py-3">{children}</div>
          {footer && <footer className="flex flex-wrap items-center justify-end gap-2 px-6 pt-3 pb-6">{footer}</footer>}
        </div>
      )}
    </dialog>
  );
}
