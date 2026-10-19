import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { IconAlert, IconUser } from "@/components/icons";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, PasswordField, Select, TextField, useToast } from "@/components/ui";
import { BRAND } from "@/config/brand";
import { FACULTIES } from "@/data/faculties";
import { ROUTES } from "@/routes";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const YEARS = [1, 2, 3, 4, 5, 6, 7, 8];

interface Values {
  name: string;
  facultyId: string;
  programId: string;
  year: string;
  email: string;
  password: string;
}
type Errors = Partial<Record<keyof Values, string>>;

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your full name.";
  if (!v.facultyId) e.facultyId = "Select your faculty.";
  if (!v.programId) e.programId = "Select your program.";
  if (!v.year) e.year = "Select your year of study.";
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!emailOk(v.email)) e.email = "Enter a valid email, like name@school.edu.";
  if (!v.password) e.password = "Create a password.";
  else if (v.password.length < 6) e.password = "Use at least 6 characters.";
  return e;
}

export default function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const [values, setValues] = useState<Values>({ name: "", facultyId: "", programId: "", year: "", email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const programs = FACULTIES.find((f) => f.id === values.facultyId)?.programs ?? [];

  const set = (patch: Partial<Values>) => {
    setValues((v) => ({ ...v, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      for (const key of Object.keys(patch) as (keyof Values)[]) delete next[key];
      return next;
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const found = validate(values);
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }

    setSubmitting(true);
    // Mock sign-up. Replace with the real API call when the backend exists.
    window.setTimeout(() => {
      setSubmitting(false);
      if (values.email.trim().toLowerCase() === "taken@school.edu") {
        setFormError("An account with this email already exists. Try signing in instead.");
        return;
      }
      toast.success(`Account created. Welcome to ${BRAND.name}!`);
      navigate(ROUTES.home);
    }, 1000);
  };

  const signIn = (
    <>
      Already have an account?{" "}
      <Link to={ROUTES.login} className={linkClass}>
        Sign in
      </Link>
    </>
  );

  return (
    <AuthLayout
      sideTitle="Join your campus tutoring network"
      sideText="Create a free account to book verified tutors from your faculty, or apply to tutor other students."
      art="book"
      topRight={signIn}
    >
      <div className="mb-4 grid size-12 place-items-center rounded-tile bg-raised text-2xl text-primary min-[960px]:hidden">
        <IconUser />
      </div>
      <h1 className="mb-2 text-[clamp(1.65rem,1.2rem+1.6vw,2rem)] leading-[1.15] font-bold">Create your account</h1>
      <p className="mb-7 max-w-[46ch] text-ink-soft">Join the University Tutoring Network.</p>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px]">
        <TextField
          label="Full name"
          autoComplete="name"
          placeholder="Ama Mensah"
          value={values.name}
          error={errors.name}
          onChange={(e) => set({ name: e.target.value })}
        />
        <Select
          label="Faculty"
          placeholder="Select your faculty"
          value={values.facultyId}
          error={errors.facultyId}
          onChange={(e) => set({ facultyId: e.target.value, programId: "" })}
        >
          {FACULTIES.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </Select>
        <Select
          label="Program"
          placeholder={values.facultyId ? "Select your program" : "Choose a faculty first"}
          value={values.programId}
          error={errors.programId}
          disabled={!values.facultyId}
          onChange={(e) => set({ programId: e.target.value })}
        >
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Select>
        <Select
          label="Year of study"
          placeholder="Select your year"
          value={values.year}
          error={errors.year}
          onChange={(e) => set({ year: e.target.value })}
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>
              Year {y}
            </option>
          ))}
        </Select>
        <TextField
          label="Email address"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="ama@school.edu"
          value={values.email}
          error={errors.email}
          onChange={(e) => set({ email: e.target.value })}
        />
        <PasswordField
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          hint="At least 6 characters."
          value={values.password}
          error={errors.password}
          onChange={(e) => set({ password: e.target.value })}
        />

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
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-[15px] text-ink-soft min-[960px]:hidden">{signIn}</p>
      <p className="mt-5 inline-block rounded-[10px] bg-raised px-3.5 py-2.5 text-[13.5px] text-primary">
        Demo mode: use taken@school.edu to see the “already registered” message.
      </p>
    </AuthLayout>
  );
}