export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "chenjin-theme";

export function isTheme(
  value: string | null | undefined,
): value is Theme {
  return value === "light" || value === "dark";
}
