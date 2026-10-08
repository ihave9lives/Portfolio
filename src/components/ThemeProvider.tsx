"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "cyberpunk" | "light" | "synthwave" | "matrix" | "tokyo-night" | "amber-crt";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { id: Theme; name: string; icon: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = [
  { id: "cyberpunk" as Theme, name: "Cyberpunk", icon: "⚡" },
  { id: "light" as Theme, name: "Light", icon: "☀️" },
  { id: "synthwave" as Theme, name: "Synthwave", icon: "🌅" },
  { id: "matrix" as Theme, name: "Matrix", icon: "🌿" },
  { id: "tokyo-night" as Theme, name: "Tokyo Night", icon: "🌃" },
  { id: "amber-crt" as Theme, name: "Amber CRT", icon: "📺" },
];

// Extend Window interface for easter egg tracking
declare global {
  interface Window {
    __themeSwitchCount?: number;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("cyberpunk");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    if (saved && themes.some(t => t.id === saved)) {
      setThemeState(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      // Check system preference for light mode
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      if (prefersLight) {
        setThemeState("light");
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    
    // Easter egg: rapid theme switching
    if (window.__themeSwitchCount === undefined) {
      window.__themeSwitchCount = 0;
    }
    window.__themeSwitchCount++;
    if (window.__themeSwitchCount >= 10) {
      // Trigger secret mode
      document.body.classList.add("secret-mode");
      setTimeout(() => document.body.classList.remove("secret-mode"), 5000);
    }
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}