import { createContext, useContext, useEffect, useState } from 'react';

export type ColorTheme = 'azul' | 'amarelo' | 'vermelho' | 'laranja' | 'verde';

interface ThemeColors { primary: string; ring: string; foreground: string }

const THEMES: Record<ColorTheme, { name: string; swatch: string; light: ThemeColors; dark: ThemeColors }> = {
  azul: {
    name: 'Azul',
    swatch: '#2563eb',
    light: { primary: '#2563eb', ring: '#2563eb', foreground: '#ffffff' },
    dark:  { primary: '#60a5fa', ring: '#60a5fa', foreground: '#0d0d0d' },
  },
  amarelo: {
    name: 'Âmbar',
    swatch: '#d97706',
    light: { primary: '#d97706', ring: '#d97706', foreground: '#ffffff' },
    dark:  { primary: '#fbbf24', ring: '#fbbf24', foreground: '#0d0d0d' },
  },
  vermelho: {
    name: 'Vermelho',
    swatch: '#dc2626',
    light: { primary: '#dc2626', ring: '#dc2626', foreground: '#ffffff' },
    dark:  { primary: '#f87171', ring: '#f87171', foreground: '#0d0d0d' },
  },
  laranja: {
    name: 'Laranja',
    swatch: '#ea580c',
    light: { primary: '#ea580c', ring: '#ea580c', foreground: '#ffffff' },
    dark:  { primary: '#fb923c', ring: '#fb923c', foreground: '#0d0d0d' },
  },
  verde: {
    name: 'Verde',
    swatch: '#16a34a',
    light: { primary: '#16a34a', ring: '#16a34a', foreground: '#ffffff' },
    dark:  { primary: '#4ade80', ring: '#4ade80', foreground: '#0d0d0d' },
  },
};

export { THEMES };

interface AppThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (t: ColorTheme) => void;
}

const AppThemeContext = createContext<AppThemeContextType>({
  isDark: false,
  toggleDark: () => {},
  colorTheme: 'azul',
  setColorTheme: () => {},
});

function applyThemeVars(isDark: boolean, colorTheme: ColorTheme) {
  const root = document.documentElement;
  const colors = isDark ? THEMES[colorTheme].dark : THEMES[colorTheme].light;

  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--ring', colors.ring);
  root.style.setProperty('--primary-foreground', colors.foreground);
  root.style.setProperty('--sidebar-primary', colors.primary);
  root.style.setProperty('--sidebar-ring', colors.ring);
  root.style.setProperty('--sidebar-primary-foreground', colors.foreground);
  root.style.setProperty('--chart-1', colors.primary);
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    return false;
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    return (localStorage.getItem('colorTheme') as ColorTheme) || 'azul';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    applyThemeVars(isDark, colorTheme);
  }, [isDark, colorTheme]);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const setColorTheme = (t: ColorTheme) => {
    setColorThemeState(t);
    localStorage.setItem('colorTheme', t);
  };

  return (
    <AppThemeContext.Provider value={{ isDark, toggleDark, colorTheme, setColorTheme }}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(AppThemeContext);
}
