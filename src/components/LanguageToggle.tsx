import { Language } from '../types.ts';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export function LanguageToggle({ currentLang, onSelectLang }: LanguageToggleProps) {
  return (
    <div
      id="language-toggle-group"
      className="flex items-center bg-gray-100 dark:bg-gray-800 p-0.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold"
    >
      <button
        id="lang-btn-en"
        type="button"
        onClick={() => onSelectLang('en')}
        title="Switch to English"
        className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
          currentLang === 'en'
            ? 'bg-white dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 shadow-2xs font-bold'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        <span className="text-xs">🇬🇧</span>
        <span>EN</span>
      </button>

      <button
        id="lang-btn-hy"
        type="button"
        onClick={() => onSelectLang('hy')}
        title="Անցնել հայերենի"
        className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
          currentLang === 'hy'
            ? 'bg-white dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 shadow-2xs font-bold'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        <span className="text-xs">🇦🇲</span>
        <span>ՀԱՅ</span>
      </button>
    </div>
  );
}
