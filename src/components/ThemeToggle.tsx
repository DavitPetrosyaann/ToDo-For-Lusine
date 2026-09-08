import { Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../types.ts';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function ThemeToggle({ theme, onToggleTheme }: ThemeToggleProps) {
  const isDark = theme === 'dark';
  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={onToggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-amber-600 dark:text-amber-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-2xs"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
    </button>
  );
}
