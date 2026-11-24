"use client";

import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buttonStyles } from "@/components/ui/button";

const fieldClass = "grid gap-1.5 text-sm font-medium";
const selectClass = "h-11 w-full rounded-md border bg-background px-3.5 text-sm text-foreground";

export function SignUpForm() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fileName, setFileName] = useState("");
  const [notice, setNotice] = useState("");

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.files?.[0]?.name ?? "");
    setNotice("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = passwordRef.current;
    const confirmation = confirmPasswordRef.current;
    if (password && confirmation && password.value !== confirmation.value) {
      confirmation.setCustomValidity("Passwords must match.");
      confirmation.reportValidity();
      confirmation.setCustomValidity("");
      return;
    }

    setNotice("The sign-up screen is ready, but account creation is not connected yet. Your details were not sent or saved.");
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate={false}>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className={fieldClass} htmlFor="full-name">Full name<Input id="full-name" name="fullName" autoComplete="name" placeholder="e.g. Ama Mensah" required /></label>
          <label className={fieldClass} htmlFor="email">Email address<Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label className={fieldClass} htmlFor="password">Password
            <span className="relative block"><Input ref={passwordRef} id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Create a password" required className="pr-12" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground"><Eye className={showPassword ? "hidden" : "size-4"} aria-hidden="true" /><EyeOff className={showPassword ? "size-4" : "hidden"} aria-hidden="true" /></button></span>
          </label>
          <label className={fieldClass} htmlFor="confirm-password">Confirm password
            <span className="relative block"><Input ref={confirmPasswordRef} id="confirm-password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" placeholder="Enter your password again" required className="pr-12" /><button type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? "Hide confirmation" : "Show confirmation"} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground"><Eye className={showConfirmPassword ? "hidden" : "size-4"} aria-hidden="true" /><EyeOff className={showConfirmPassword ? "size-4" : "hidden"} aria-hidden="true" /></button></span>
          </label>
          <label className={fieldClass} htmlFor="student-id">Student ID number<Input id="student-id" name="studentId" autoComplete="off" placeholder="Your university ID" required /></label>
          <label className={fieldClass} htmlFor="university">University
            <select id="university" name="university" defaultValue="pentecost" className={selectClass} required><option value="pentecost">Pentecost University</option></select>
          </label>
          <label className={fieldClass} htmlFor="programme">Programme<Input id="programme" name="programme" placeholder="e.g. BSc Computer Science" required /></label>
          <label className={fieldClass} htmlFor="academic-level">Academic level
            <select id="academic-level" name="academicLevel" defaultValue="" className={selectClass} required><option value="" disabled>Select your level</option><option>Level 100</option><option>Level 200</option><option>Level 300</option><option>Level 400</option></select>
          </label>
          <label className={fieldClass} htmlFor="account-type">Account type
            <select id="account-type" name="accountType" defaultValue="student" className={selectClass} required><option value="student">Student</option><option value="tutor">Tutor</option><option value="both">Student and tutor</option></select>
          </label>
          <label className={`${fieldClass} sm:col-span-2`} htmlFor="student-id-card">Student ID card
            <span className="relative flex min-h-20 cursor-pointer items-center gap-3 rounded-md border border-dashed px-4 py-3 text-muted-foreground transition-colors hover:border-primary hover:bg-muted/50">
              <Upload className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="min-w-0"><span className="block truncate text-sm font-medium text-foreground">{fileName || "Choose an image to attach"}</span><span className="mt-0.5 block text-xs font-normal">JPG or PNG</span></span>
              <input id="student-id-card" name="studentIdCard" type="file" accept="image/jpeg,image/png" required onChange={handleFile} className="absolute inset-0 cursor-pointer opacity-0" aria-label="Choose student ID card image" />
            </span>
          </label>
          <label className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground sm:col-span-2"><input type="checkbox" required className="mt-1 size-4 accent-primary" /><span>I confirm these details match my student records.</span></label>
        </div>

        {notice && <p role="status" className="mt-5 rounded-md border border-primary/25 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-foreground">{notice}</p>}
        <button type="submit" className={`${buttonStyles({ size: "lg" })} mt-6 w-full`}>
          Create account <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-muted-foreground">Already have an account? <Link href="/sign-in" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">Sign in</Link></p>
      <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">Your student ID is for verification. <Link href="/verification" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">See how verification works</Link></p>
    </>
  );
}
