import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { isoFromToday } from "@/lib/dates";
import type { Booking, PaymentMethod, User } from "@/types";

/**
 * Mock bookings, kept per signed-in student in localStorage. Replace this file's internals with
 * API calls when the backend exists; the screens keep using useBookings().
 */
const STORAGE_KEY = "campusconnect-bookings";
type Store = Record<string, Booking[]>;

export interface NewBooking {
  tutorId: string;
  tutorName: string;
  subject: string;
  /** Local ISO date, e.g. "2026-10-28". */
  date: string;
  time: string;
  location: string;
  price: number;
  paymentMethod: PaymentMethod;
}

interface BookingsContextValue {
  bookings: Booking[];
  addBooking: (input: NewBooking) => Booking;
  cancelBooking: (id: string) => void;
  reviewBooking: (id: string, rating: number, text: string) => void;
}

const BookingsContext = createContext<BookingsContextValue | null>(null);

function readStore(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* storage can be unavailable; bookings then last until the page closes */
  }
}

/** Two sample bookings so a first-time student can see how upcoming and completed sessions look. */
function demoBookings(user: User): Booking[] {
  const base = { studentId: user.id, studentName: user.name, paymentMethod: "Mobile Money (MoMo)" as const };
  return [
    {
      ...base,
      id: "demo-upcoming",
      tutorId: "s2",
      tutorName: "Prof. James Osei",
      subject: "CSC 102",
      date: isoFromToday(3),
      time: "2:00 PM",
      location: "FESAC Building, Lab 3",
      status: "confirmed",
      price: 70,
      ratingGiven: false,
      tutorRating: 0,
      reviewText: "",
    },
    {
      ...base,
      id: "demo-completed",
      tutorId: "t1",
      tutorName: "Michael Asare",
      subject: "CSC 101",
      date: isoFromToday(-12),
      time: "4:00 PM",
      location: "CS Lab",
      status: "completed",
      price: 35,
      ratingGiven: false,
      tutorRating: 0,
      reviewText: "",
    },
  ];
}

export function BookingsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [store, setStore] = useState<Store>(readStore);
  const userId = user?.id;

  // Give each student their sample bookings the first time they arrive.
  useEffect(() => {
    if (!user || store[user.id]) return;
    const next = { ...store, [user.id]: demoBookings(user) };
    writeStore(next);
    setStore(next);
  }, [user, store]);

  const bookings = useMemo(() => (userId ? (store[userId] ?? []) : []), [store, userId]);

  const update = useCallback(
    (change: (list: Booking[]) => Booking[]) => {
      if (!userId) return;
      setStore((current) => {
        const next = { ...current, [userId]: change(current[userId] ?? []) };
        writeStore(next);
        return next;
      });
    },
    [userId],
  );

  const addBooking = useCallback(
    (input: NewBooking): Booking => {
      const booking: Booking = {
        ...input,
        id: `b-${Date.now()}`,
        studentId: user?.id ?? "",
        studentName: user?.name ?? "",
        status: "pending",
        ratingGiven: false,
        tutorRating: 0,
        reviewText: "",
      };
      update((list) => [booking, ...list]);
      return booking;
    },
    [update, user],
  );

  const cancelBooking = useCallback(
    (id: string) => update((list) => list.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))),
    [update],
  );

  const reviewBooking = useCallback(
    (id: string, rating: number, text: string) =>
      update((list) => list.map((b) => (b.id === id ? { ...b, ratingGiven: true, tutorRating: rating, reviewText: text } : b))),
    [update],
  );

  const value = useMemo(
    () => ({ bookings, addBooking, cancelBooking, reviewBooking }),
    [bookings, addBooking, cancelBooking, reviewBooking],
  );
  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
}

export function useBookings() {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error("useBookings must be used inside <BookingsProvider>");
  return ctx;
}