import type { ReactNode, SVGProps } from "react";

/**
 * Icon set in the Autolyn design style: 24px grid, 2.2 stroke, round caps and joins.
 * Icons size with the surrounding text (1em) unless a `size` is passed.
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number | string;
}

/** Any icon component, so components can accept an icon as a prop. */
export type IconComponent = (props: IconProps) => ReactNode;

export function Svg({ size = "1em", children, ...p }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...p}
    >
      {children}
    </svg>
  );
}

/* ---------- From the Autolyn design ---------- */
export const IconCheck = (p: IconProps) => (
  <Svg strokeWidth={2.8} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);
export const IconEye = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);
export const IconEyeOff = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 3l18 18" />
    <path d="M10.6 5.1A10 10 0 0112 5c6.4 0 10 7 10 7a17 17 0 01-3.2 4.1M6.5 6.5A17 17 0 002 12s3.6 7 10 7a9.7 9.7 0 004.2-.9" />
    <path d="M9.9 9.9a3 3 0 004.2 4.2" />
  </Svg>
);
export const IconBack = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15 6l-6 6 6 6" />
  </Svg>
);
export const IconEdit = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20h4L19 9l-4-4L4 16v4z" />
    <path d="M13.5 6.5l4 4" />
  </Svg>
);
export const IconUser = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
  </Svg>
);
export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M4 8l8 6 8-6" />
  </Svg>
);
export const IconBook = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 6c-2-1.3-4.6-1.7-8-1.5v13c3.4-.2 6 .2 8 1.5 2-1.3 4.6-1.7 8-1.5v-13c-3.4-.2-6 .2-8 1.5z" />
    <path d="M12 6v13" />
  </Svg>
);
export const IconClipboard = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="4" width="14" height="17" rx="3" />
    <path d="M9 4h6v3H9zM9 13l2 2 4-4" />
  </Svg>
);
export const IconAlert = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
    <path d="M10.3 3.9L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
  </Svg>
);
export const IconPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const IconRoster = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="5" width="16" height="14" rx="2.5" />
    <path d="M8 9h8M8 13h8M8 17h5" />
  </Svg>
);
export const IconTrash = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M9 7V4h6v3M7 7l1 12h8l1-12" />
  </Svg>
);

/* ---------- Added for TutorMatch, drawn in the same style ---------- */
export const IconHome = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 11.5L12 4.5l8.5 7" />
    <path d="M6 10v9.5h12V10" />
    <path d="M10 19.5v-5h4v5" />
  </Svg>
);
export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="5.5" width="16" height="14.5" rx="3" />
    <path d="M4 10.5h16M8.5 3.5v4M15.5 3.5v4" />
  </Svg>
);
export const IconBell = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 16v-5a6 6 0 0112 0v5l1.5 2h-15L6 16z" />
    <path d="M10 21h4" />
  </Svg>
);
export const IconChat = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-8l-5 4v-4H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
  </Svg>
);
export const IconSearch = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </Svg>
);
export const IconStar = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5z" />
  </Svg>
);
export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);
export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 9l6 6 6-6" />
  </Svg>
);
export const IconChevronRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 6l6 6-6 6" />
  </Svg>
);
export const IconInfo = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 7.5h.01" />
  </Svg>
);
export const IconCheckCircle = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l3 3 5-6" />
  </Svg>
);
export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="3" />
    <path d="M8 10.5V8a4 4 0 018 0v2.5" />
  </Svg>
);
export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 005.5 5.5L16 13l4 1.5v3a2 2 0 01-2 2A14 14 0 014.5 6a2 2 0 012-2z" />
  </Svg>
);
export const IconCard = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="3" />
    <path d="M3 10h18M7 15h3" />
  </Svg>
);
export const IconWallet = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8V7a2.5 2.5 0 012.5-2.5H17V8" />
    <rect x="3" y="8" width="18" height="12" rx="3" />
    <path d="M16.5 14h.01" />
  </Svg>
);
export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 10-13 0C5.5 15.4 12 21 12 21z" />
    <circle cx="12" cy="10" r="2.3" />
  </Svg>
);
export const IconCap = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 9.5L12 5l9.5 4.5L12 14z" />
    <path d="M6.5 11.8V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.2" />
    <path d="M21.5 9.5V15" />
  </Svg>
);
export const IconTrend = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </Svg>
);

export const IconGlobe = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);

/** Every icon by name, used by the component gallery. */
export const ICON_SET: Record<string, IconComponent> = {
  Home: IconHome,
  Calendar: IconCalendar,
  Bell: IconBell,
  Chat: IconChat,
  User: IconUser,
  Search: IconSearch,
  Star: IconStar,
  Mail: IconMail,
  Lock: IconLock,
  Phone: IconPhone,
  Card: IconCard,
  Wallet: IconWallet,
  Pin: IconPin,
  Cap: IconCap,
  Trend: IconTrend,
  Book: IconBook,
  Clipboard: IconClipboard,
  Roster: IconRoster,
  Check: IconCheck,
  CheckCircle: IconCheckCircle,
  Info: IconInfo,
  Alert: IconAlert,
  Eye: IconEye,
  EyeOff: IconEyeOff,
  Edit: IconEdit,
  Trash: IconTrash,
  Plus: IconPlus,
  Close: IconClose,
  Back: IconBack,
  ChevronDown: IconChevronDown,
  ChevronRight: IconChevronRight,
};