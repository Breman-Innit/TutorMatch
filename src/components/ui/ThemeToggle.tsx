import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/theme/ThemeProvider";
import { Card } from "./Card";
import { IconButton } from "./IconButton";
import { IconTile } from "./IconTile";
import { Switch } from "./Switch";

/** Compact sun/moon button for headers. */
export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <IconButton label={isDark ? "Switch to light mode" : "Switch to dark mode"} variant="filled" onClick={toggleTheme}>
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </IconButton>
  );
}

/** The "Appearance" settings row from the Android profile screen. */
export function ThemeToggleRow() {
  const { isDark, setTheme } = useTheme();
  return (
    <Card className="flex items-center gap-3.5 p-4">
      <IconTile icon={isDark ? Moon : Sun} />
      <div className="flex-1">
        <p className="text-sm font-medium">Appearance</p>
        <p className="text-xs text-ink-soft">{isDark ? "Dark mode" : "Light mode"}</p>
      </div>
      <Switch checked={isDark} onChange={(on) => setTheme(on ? "dark" : "light")} label="Dark mode" />
    </Card>
  );
}
