import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { User } from "@/types";

/**
 * Mock authentication. The signed-in user and the accounts created on this device are kept in
 * localStorage. When the backend exists, only this file changes: the screens keep calling
 * signIn / signUp / signOut.
 */
const SESSION_KEY = "campusconnect-user";
const ACCOUNTS_KEY = "campusconnect-accounts";

export interface SignUpDetails {
  name: string;
  email: string;
  facultyId: string;
  programId: string;
  year: number;
}

interface AuthContextValue {
  user: User | null;
  signIn: (email: string) => void;
  signUp: (details: SignUpDetails) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage can be unavailable (private mode); the session then lasts until the page closes */
  }
}

const capitalise = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

/** "ama.mensah@school.edu" -> "Ama Mensah". Used for demo sign-ins with no saved account. */
const nameFromEmail = (email: string) =>
  email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map(capitalise)
    .join(" ") || "Student";

const baseUser = (details: Pick<User, "name" | "email" | "facultyId" | "programId" | "yearOfStudy">): User => ({
  id: `u-${details.email.toLowerCase()}`,
  ...details,
  role: "student",
  isApprovedTutor: false,
  tutorApplicationStatus: "none",
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => read<User | null>(SESSION_KEY, null));

  const start = useCallback((next: User) => {
    write(SESSION_KEY, next);
    setUser(next);
  }, []);

  const signIn = useCallback(
    (email: string) => {
      const key = email.trim().toLowerCase();
      const accounts = read<Record<string, User>>(ACCOUNTS_KEY, {});
      start(
        accounts[key] ??
          baseUser({ name: nameFromEmail(key), email: key, facultyId: "fba", programId: "acc", yearOfStudy: 2 }),
      );
    },
    [start],
  );

  const signUp = useCallback(
    (d: SignUpDetails) => {
      const created = baseUser({
        name: d.name.trim(),
        email: d.email.trim().toLowerCase(),
        facultyId: d.facultyId,
        programId: d.programId,
        yearOfStudy: d.year,
      });
      write(ACCOUNTS_KEY, { ...read<Record<string, User>>(ACCOUNTS_KEY, {}), [created.email]: created });
      start(created);
    },
    [start],
  );

  const signOut = useCallback(() => {
    write(SESSION_KEY, null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, signIn, signUp, signOut }), [user, signIn, signUp, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}