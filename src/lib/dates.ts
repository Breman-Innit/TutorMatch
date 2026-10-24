/** Dates are stored as local "YYYY-MM-DD" strings so they never shift with time zones. */
export const toISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const fromISODate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

/** "2026-10-28" -> "Wed, 28 Oct". */
export const formatBookingDate = (iso: string) =>
  fromISODate(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

/** A date `days` from today, as an ISO string. Negative numbers go back in time. */
export const isoFromToday = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toISODate(d);
};