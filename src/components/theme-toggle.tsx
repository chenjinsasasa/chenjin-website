"use client";

import { useEffect, useState } from "react";
import { isTheme, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <path
        d="M12 2.75v2.5m0 13.5v2.5M21.25 12h-2.5M5.25 12H2.75m15.788-6.038-1.768 1.768M7.23 16.77l-1.768 1.768m0-12.576L7.23 7.73m11.308 11.308-1.768-1.768"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.9 3.4a8.9 8.9 0 1 0 5.7 15.9A9.6 9.6 0 0 1 14.9 3.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function getCurrentTheme(): Theme {
  const activeTheme = document.documentElement.dataset.theme;

  if (isTheme(activeTheme)) {
    return activeTheme;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(storedTheme) ? storedTheme : getSystemTheme();
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      const nextTheme = getCurrentTheme();
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    const handleSystemThemeChange = () => {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

      if (!isTheme(storedTheme)) {
        const nextTheme = getSystemTheme();
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }
    };

    syncTheme();
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const resolvedTheme = theme ?? "light";
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  const handleToggle = () => {
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={resolvedTheme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
      title={resolvedTheme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
