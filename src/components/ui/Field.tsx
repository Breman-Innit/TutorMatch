import { useId, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { ChevronDown, Eye, EyeOff, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/* ---------- shared pieces ---------- */

const controlBase =
  "w-full rounded-field border bg-surface text-[15px] text-ink transition outline-none " +
  "placeholder:text-ink-muted focus:bg-raised disabled:cursor-not-allowed disabled:opacity-60";

const controlBorder = (error?: string) =>
  error ? "border-danger focus:border-danger" : "border-line focus:border-primary";

interface FieldFrameProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

/** Label above the control, hint or error below it. */
function FieldFrame({ id, label, hint, error, children }: FieldFrameProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-ink-soft">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} role="alert" className="text-xs font-medium text-danger-ink">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) => (error || hint ? `${id}-msg` : undefined);

/* ---------- TextField ---------- */

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  hint?: string;
  error?: string;
  leadingIcon?: LucideIcon;
  /** Element placed inside the field on the right (e.g. a clear or show-password button). */
  trailing?: ReactNode;
}

export function TextField({ label, hint, error, leadingIcon: Icon, trailing, className, id, ...rest }: TextFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldFrame id={fieldId} label={label} hint={hint} error={error}>
      <div className="relative">
        {Icon && (
          <Icon size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-muted" />
        )}
        <input
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, error, hint)}
          className={cn(controlBase, controlBorder(error), "h-13", Icon ? "pl-11" : "pl-4", trailing ? "pr-12" : "pr-4", className)}
          {...rest}
        />
        {trailing && <div className="absolute top-1/2 right-2 -translate-y-1/2">{trailing}</div>}
      </div>
    </FieldFrame>
  );
}

/* ---------- PasswordField ---------- */

export function PasswordField(props: Omit<TextFieldProps, "type" | "trailing">) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-primary/10 hover:text-ink"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}

/* ---------- TextArea ---------- */

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function TextArea({ label, hint, error, className, id, rows = 4, ...rest }: TextAreaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldFrame id={fieldId} label={label} hint={hint} error={error}>
      <textarea
        id={fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fieldId, error, hint)}
        className={cn(controlBase, controlBorder(error), "resize-y px-4 py-3.5", className)}
        {...rest}
      />
    </FieldFrame>
  );
}

/* ---------- Select ---------- */

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  error?: string;
  /** Disabled first option shown while nothing is chosen, e.g. "Select faculty". */
  placeholder?: string;
}

/** Native select (best keyboard + mobile behaviour) styled to match the other fields. */
export function Select({ label, hint, error, placeholder, className, id, children, value, ...rest }: SelectProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const empty = value === "" || value === undefined;
  return (
    <FieldFrame id={fieldId} label={label} hint={hint} error={error}>
      <div className="relative">
        <select
          id={fieldId}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, error, hint)}
          className={cn(controlBase, controlBorder(error), "h-13 appearance-none pr-11 pl-4", empty && "text-ink-muted", className)}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-muted" />
      </div>
    </FieldFrame>
  );
}
