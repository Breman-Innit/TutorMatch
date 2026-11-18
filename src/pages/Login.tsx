import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { IconAlert, IconLock } from "@/components/icons";
import { useAuth } from "@/auth/AuthProvider";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, PasswordField, TextField, useToast } from "@/components/ui";
import { ROUTES } from "@/routes";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

interface Errors {
  email?: string;
  password?: string;
}

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const focusFirstError = () =>
    requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const next: Errors = {};
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!emailOk(email)) next.email = "Enter a valid email, like name@school.edu.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) {
      focusFirstError();
      return;
    }

    setSubmitting(true);
    // Mock sign-in. Replace with the real API call when the backend exists.
    window.setTimeout(() => {
      setSubmitting(false);
      if (password === "wrong") {
        setFormError("That email and password don't match. Check them and try again.");
        return;
      }
      signIn(email);
navigate(ROUTES.home);
    }, 900);
  };

  const createAccount = (
    <>
      New here?{" "}
      <Link to={ROUTES.signup} className={linkClass}>
        Create an account
      </Link>
    </>
  );

  return (
    <AuthLayout
      sideTitle="Welcome back"
      sideText="Sign in to find tutors, manage your bookings and keep your conversations in one place."
      art="find"
      topRight={createAccount}
    >
      <div className="mb-4 grid size-12 place-items-center rounded-tile bg-raised text-2xl text-primary min-[960px]:hidden">
        <IconLock />
      </div>
      <h1 className="mb-2 text-[clamp(1.65rem,1.2rem+1.6vw,2rem)] leading-[1.15] font-bold">Sign in</h1>
      <p className="mb-7 max-w-[46ch] text-ink-soft">Welcome back. Enter your details to continue.</p>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px]">
        <TextField
          label="Email address"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="ama@school.edu"
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((x) => ({ ...x, email: undefined }));
          }}
        />
        <div>
          <PasswordField
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            error={errors.password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((x) => ({ ...x, password: undefined }));
            }}
          />
          <button
            type="button"
            onClick={() => toast.info("Password reset will be available once the backend is ready.")}
            className={`${linkClass} mt-2 text-sm`}
          >
            Forgot password?
          </button>
        </div>

        {formError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-field border border-danger/25 bg-danger/10 px-3.5 py-3 text-sm leading-snug text-danger-ink"
          >
            <IconAlert className="mt-px shrink-0 text-lg" />
            <span>{formError}</span>
          </div>
        )}

        <Button type="submit" fullWidth loading={submitting}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-[15px] text-ink-soft min-[960px]:hidden">{createAccount}</p>
      <p className="mt-5 inline-block rounded-[10px] bg-raised px-3.5 py-2.5 text-[13.5px] text-primary">
        Demo mode: any email and password works, except the password “wrong”.
      </p>
    </AuthLayout>
  );
}
