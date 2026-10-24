import { useState } from "react";
import { useNavigate } from "react-router";
import { IconCard, IconCheckCircle, IconPhone, IconWallet } from "@/components/icons";
import { useBookings } from "@/bookings/BookingsProvider";
import { Button, ChoiceCard, Modal, TextField } from "@/components/ui";
import { ROUTES } from "@/routes";
import type { PaymentMethod } from "@/types";

interface PaymentModalProps {
  onClose: () => void;
  tutorId: string;
  tutorName: string;
  /** Local ISO date of the session, e.g. "2026-10-28". */
  dateISO: string;
  time: string;
  course: string;
  dateLabel: string;
  place: string;
  price: number;
}

const METHODS: { method: PaymentMethod; description: string; icon: typeof IconCard }[] = [
  { method: "Mobile Money (MoMo)", description: "MTN, Telecel or AirtelTigo", icon: IconPhone },
  { method: "Card", description: "Visa or Mastercard", icon: IconCard },
  { method: "Bank Transfer", description: "Pay from your bank account", icon: IconWallet },
];

const phoneOk = (v: string) => /^0\d{9}$/.test(v.replace(/\s+/g, ""));

/** Payment step of the booking flow. Mount it only while it should be open, so it resets each time. */
export function PaymentModal({ onClose, tutorId, tutorName, dateISO, time, course, dateLabel, place, price }: PaymentModalProps) {
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [method, setMethod] = useState<PaymentMethod>("Mobile Money (MoMo)");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const pay = () => {
    if (method === "Mobile Money (MoMo)" && !phoneOk(phone)) {
      setPhoneError("Enter a 10-digit MoMo number, like 0241234567.");
      return;
    }
    setPaying(true);
    // Mock payment. Replace with the real payment provider when the backend exists.
    window.setTimeout(() => {
      addBooking({ tutorId, tutorName, subject: course, date: dateISO, time, location: place, price, paymentMethod: method });
      setPaying(false);
      setPaid(true);
    }, 1200);
  };

  if (paid) {
    return (
      <Modal
        open
        onClose={onClose}
        title="Booking requested"
        footer={
          <>
            <Button variant="ghost" onClick={() => navigate(ROUTES.home)}>
              Back to tutors
            </Button>
            <Button onClick={() => navigate(ROUTES.bookings)}>View my bookings</Button>
          </>
        }
      >
        <div className="flex flex-col items-center py-2 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-success/12 text-4xl text-success-ink">
            <IconCheckCircle />
          </span>
          <h3 className="mt-4 text-xl font-bold">Payment successful</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Your session request has been sent to {tutorName}. You will be notified as soon as it is confirmed.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Complete payment"
      icon={IconCard}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={paying}>
            Cancel
          </Button>
          <Button onClick={pay} loading={paying}>
            Pay ₵{price}
          </Button>
        </>
      }
    >
      <div className="flex items-center justify-between gap-4 rounded-field bg-raised p-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{course}</p>
          <p className="truncate text-xs text-ink-soft">with {tutorName}</p>
          <p className="mt-1 truncate text-xs text-ink-soft">
            {dateLabel} · {place}
          </p>
        </div>
        <p className="shrink-0 text-2xl font-bold text-primary">₵{price}</p>
      </div>

      <fieldset className="mt-5 min-w-0" disabled={paying}>
        <legend className="float-left mb-2 w-full text-sm font-semibold">Payment method</legend>
        <div className="clear-both flex flex-col gap-2.5">
          {METHODS.map((m) => (
            <ChoiceCard
              key={m.method}
              name="payment-method"
              icon={m.icon}
              title={m.method}
              description={m.description}
              checked={method === m.method}
              onChange={() => setMethod(m.method)}
            />
          ))}
        </div>
      </fieldset>

      {method === "Mobile Money (MoMo)" ? (
        <div className="mt-4">
          <TextField
            label="MoMo number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="024XXXXXXX"
            value={phone}
            error={phoneError}
            disabled={paying}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError("");
            }}
          />
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-soft">You will be asked for your payment details securely in the next step.</p>
      )}
      <p className="mt-4 text-xs text-ink-muted">The tutor will confirm your booking by notification.</p>
    </Modal>
  );
}