import { useState, FormEvent } from 'react';
import { Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import { Language, ThemeMode } from '../types.ts';
import { getSavedPassword, setAppUnlocked } from '../utils/storage.ts';
import { LanguageToggle } from './LanguageToggle.tsx';
import { ThemeToggle } from './ThemeToggle.tsx';

interface PasswordGateProps {
  onUnlock: () => void;
  lang: Language;
  theme: ThemeMode;
  onSelectLang: (lang: Language) => void;
  onToggleTheme: () => void;
}

export function PasswordGate({ onUnlock, lang, theme, onSelectLang, onToggleTheme }: PasswordGateProps) {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const isHy = lang === 'hy';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const correct = getSavedPassword();
    if (passwordInput === correct || (!correct && passwordInput === 'lusine')) {
      setError(false);
      setAppUnlocked(true);
      onUnlock();
    } else setError(true);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] dark:bg-gray-950 flex flex-col items-center justify-center p-4 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <LanguageToggle currentLang={lang} onSelectLang={onSelectLang} />
        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-7 max-w-xs w-full border border-gray-200 dark:border-gray-800 shadow-md text-center">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl mx-auto flex items-center justify-center mb-3">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-0.5 flex items-center justify-center gap-1.5">
          <span className="text-2xl filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]">🌙</span>
          <span>Lusine&apos;s Todo</span>
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          {isHy ? 'Մուտքագրեք գաղտնաբառը' : 'Enter password to unlock planner'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="relative">
            <input
              id="app-password-input"
              type={showPassword ? 'text' : 'password'}
              required
              autoFocus
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setError(false); }}
              placeholder={isHy ? 'Գաղտնաբառ...' : 'Passcode...'}
              className={`w-full text-center text-sm px-3 py-2 rounded-xl border dark:bg-gray-800 dark:text-gray-100 ${
                error ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40' : 'border-gray-300 dark:border-gray-700'
              }`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          {error && <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">{isHy ? 'Սխալ գաղտնաբառ։' : 'Wrong passcode.'}</p>}
          <button id="unlock-app-btn" type="submit" className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors">
            {isHy ? 'Բացել' : 'Unlock'} 🗝️
          </button>
        </form>

        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={() => setShowHint(!showHint)} className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center justify-center gap-1 mx-auto">
            <KeyRound className="w-3 h-3" />
            <span>{showHint ? (isHy ? 'Գաղտնաբառ՝ lusine' : 'Passcode: lusine') : (isHy ? 'Հուշում' : 'Hint')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
