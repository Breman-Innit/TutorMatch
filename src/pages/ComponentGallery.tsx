import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft, Bell, CalendarDays, CreditCard, GraduationCap, Lock, Mail, MapPin, Phone, Search, Wallet } from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  IconButton,
  IconTile,
  Modal,
  PasswordField,
  Select,
  Spinner,
  StarRating,
  StarRatingInput,
  Switch,
  TextArea,
  TextField,
  ThemeToggle,
  ThemeToggleRow,
  useToast,
  type Tone,
} from "@/components/ui";
import { BRAND } from "@/config/brand";
import { ROUTES } from "@/routes";

/** Developer-only page: every shared component in every state, in the current theme. */

const TONES: Tone[] = ["primary", "accent", "success", "danger", "gold"];

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-extrabold">{title}</h2>
        {note && <p className="mt-1 max-w-prose text-sm text-ink-soft">{note}</p>}
      </div>
      {children}
    </section>
  );
}

const SWATCHES: { name: string; className: string }[] = [
  { name: "canvas", className: "bg-canvas" },
  { name: "surface", className: "bg-surface" },
  { name: "raised", className: "bg-raised" },
  { name: "card", className: "bg-card" },
  { name: "line", className: "bg-line" },
  { name: "primary", className: "bg-primary" },
  { name: "primary-deep", className: "bg-primary-deep" },
  { name: "primary-soft", className: "bg-primary-soft" },
  { name: "accent", className: "bg-accent" },
  { name: "gold", className: "bg-gold" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "danger", className: "bg-danger" },
];

export default function ComponentGallery() {
  const toast = useToast();
  const [chip, setChip] = useState("All");
  const [rating, setRating] = useState(4);
  const [notifs, setNotifs] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState("");
  const [email, setEmail] = useState("");

  const emailError = email && !/^\S+@\S+\.\S+$/.test(email) ? "Enter a valid email address." : undefined;

  const fakeSave = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated");
    }, 1200);
  };

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link to={ROUTES.home} aria-label="Back to app" className="rounded-full p-2 hover:bg-primary/10">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg leading-tight font-extrabold">{BRAND.name} components</h1>
            <p className="text-xs text-ink-soft">Developer gallery — not part of the product</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-10 sm:px-6">
        <Section title="Colour tokens" note="Ported from the Android palette. Toggle the theme to check both sets.">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
            {SWATCHES.map((s) => (
              <div key={s.name} className="flex flex-col gap-1.5">
                <div className={`h-14 rounded-tile border border-line ${s.className}`} />
                <span className="text-xs text-ink-soft">{s.name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Buttons" note="Solid gradient pills for actions; outline and ghost for secondary ones.">
          <div className="flex flex-wrap items-center gap-3">
            {TONES.map((t) => (
              <Button key={t} tone={t}>
                {t[0].toUpperCase() + t.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline">Outline</Button>
            <Button variant="outline" tone="danger">
              Log out
            </Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button icon={<CalendarDays size={18} />}>Book session</Button>
            <Button disabled>Disabled</Button>
            <Button loading={loading} onClick={fakeSave}>
              {loading ? "Saving…" : "Save changes"}
            </Button>
          </div>
          <div className="max-w-sm">
            <Button fullWidth>Full width</Button>
          </div>
        </Section>

        <Section title="Chips and badges">
          <div className="flex flex-wrap gap-2">
            {["All", "Student Tutors", "Staff Tutors"].map((c) => (
              <Chip key={c} selected={chip === c} onClick={() => setChip(c)}>
                {c}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="gold">Student</Badge>
            <Badge tone="accent">Staff</Badge>
            <Badge tone="success">Confirmed</Badge>
            <Badge tone="warning">Pending</Badge>
            <Badge tone="danger">Cancelled</Badge>
            <Badge tone="primary" icon={<MapPin size={12} />}>
              On campus
            </Badge>
          </div>
        </Section>

        <Section title="Avatars, ratings and icon tiles">
          <div className="flex flex-wrap items-end gap-5">
            <Avatar name="Dr. Sarah Mensah" size={64} tone="accent" verified />
            <Avatar name="Michael Asare" size={58} verified />
            <Avatar name="Esi Mensah" size={44} tone="success" />
            <Avatar name="Kofi" size={32} />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <StarRating rating={4.9} size={16} />
              <span className="text-sm font-bold">4.9</span>
              <span className="text-xs text-ink-muted">(124)</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <StarRatingInput value={rating} onChange={setRating} />
              <span className="text-xs text-ink-soft">You rated {rating} / 5</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <IconTile icon={Bell} />
            <IconTile icon={Wallet} tone="success" />
            <IconTile icon={GraduationCap} tone="gold" />
            <IconTile icon={CreditCard} tone="accent" filled size={44} />
            <IconTile icon={Phone} filled round size={44} />
            <IconButton label="Search" variant="filled">
              <Search size={20} />
            </IconButton>
            <Spinner />
          </div>
        </Section>

        <Section title="Form fields" note="Labels sit above the field so they stay readable; errors explain how to fix the problem.">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Email"
              type="email"
              placeholder="you@university.edu.gh"
              leadingIcon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              hint="Use your university email if you have one."
            />
            <PasswordField label="Password" placeholder="At least 6 characters" leadingIcon={Lock} />
            <Select label="Faculty" placeholder="Select your faculty" value={faculty} onChange={(e) => setFaculty(e.target.value)}>
              <option value="fba">Faculty of Business Administration (FBA)</option>
              <option value="fesac">Faculty of Engineering, Science and Computing (FESAC)</option>
              <option value="fhas">Faculty of Health and Allied Sciences (FHAS)</option>
              <option value="law">Faculty of Law</option>
            </Select>
            <TextField label="Phone" placeholder="024XXXXXXX" leadingIcon={Phone} disabled />
            <div className="sm:col-span-2">
              <TextArea label="Notes (optional)" placeholder="What topics would you like to focus on?" />
            </div>
          </div>
        </Section>

        <Section title="Cards, switch and theme row">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-5">
              <h3 className="font-bold">Static card</h3>
              <p className="mt-1 text-sm text-ink-soft">Bordered, no shadow — the base block for every screen.</p>
            </Card>
            <Card className="p-5" onClick={() => toast.info("Card clicked")}>
              <h3 className="font-bold">Clickable card</h3>
              <p className="mt-1 text-sm text-ink-soft">Works with mouse, Enter and Space.</p>
            </Card>
            <Card className="flex items-center gap-3.5 p-4">
              <IconTile icon={Bell} />
              <div className="flex-1">
                <p className="text-sm font-medium">Booking confirmations</p>
                <p className="text-xs text-ink-soft">Get notified when a tutor confirms</p>
              </div>
              <Switch checked={notifs} onChange={setNotifs} label="Booking confirmations" />
            </Card>
            <ThemeToggleRow />
          </div>
        </Section>

        <Section title="Dialog and toasts">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setModalOpen(true)} icon={<CreditCard size={18} />}>
              Open payment dialog
            </Button>
            <Button variant="outline" onClick={() => toast.success("Payment successful via Mobile Money")}>
              Success toast
            </Button>
            <Button variant="outline" tone="danger" onClick={() => toast.error("Network error. Check your connection.")}>
              Error toast
            </Button>
            <Button variant="outline" onClick={() => toast.info("Tutor will confirm your booking shortly")}>
              Info toast
            </Button>
          </div>
        </Section>
      </main>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Complete payment"
        icon={CreditCard}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
                toast.success("Payment successful");
              }}
            >
              Pay ₵45
            </Button>
          </>
        }
      >
        <Card className="flex items-center justify-between bg-raised p-4">
          <div>
            <p className="text-sm text-ink-soft">CSC 101</p>
            <p className="text-xs text-ink-muted">with Michael Asare</p>
          </div>
          <p className="font-display text-xl font-extrabold text-primary-ink">₵45</p>
        </Card>
        <p className="mt-4 text-sm text-ink-soft">The tutor will confirm your booking by notification.</p>
      </Modal>
    </div>
  );
}
