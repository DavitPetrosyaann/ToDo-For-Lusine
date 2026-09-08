import { Language, ThemeMode } from '../types.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { HeaderActions } from './HeaderActions.tsx';

interface HeaderProps {
  lang: Language;
  theme: ThemeMode;
  isFocusMode: boolean;
  viewMode: 'list' | 'calendar';
  onSelectLang: (lang: Language) => void;
  onToggleTheme: () => void;
  onToggleFocusMode: () => void;
  onToggleViewMode: () => void;
  onOpenNewTask: () => void;
  onLockApp: () => void;
  onOpenPasswordSettings: () => void;
  onOpenStyleSettings: () => void;
}

export function Header({
  lang,
  theme,
  isFocusMode,
  viewMode,
  onSelectLang,
  onToggleTheme,
  onToggleFocusMode,
  onToggleViewMode,
  onOpenNewTask,
  onLockApp,
  onOpenPasswordSettings,
  onOpenStyleSettings,
}: HeaderProps) {
  const t = TRANSLATIONS[lang];

  return (
    <header className="w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 px-4 py-3 shadow-2xs transition-colors">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] select-none hover:rotate-12 transition-transform cursor-pointer"
            title={lang === 'hy' ? 'Լուսինե նշանակում է Լուսին (Moon) 🌙' : 'Lusine means Moon (Լուսին) 🌙'}
            aria-label="Moon"
          >
            🌙
          </span>
          <div>
            <h1 id="app-main-title" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Lusine&apos;s Todo
            </h1>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">{t.subtitle}</p>
          </div>
        </div>

        <HeaderActions
          lang={lang}
          theme={theme}
          isFocusMode={isFocusMode}
          viewMode={viewMode}
          onSelectLang={onSelectLang}
          onToggleTheme={onToggleTheme}
          onToggleFocusMode={onToggleFocusMode}
          onToggleViewMode={onToggleViewMode}
          onOpenNewTask={onOpenNewTask}
          onLockApp={onLockApp}
          onOpenPasswordSettings={onOpenPasswordSettings}
          onOpenStyleSettings={onOpenStyleSettings}
        />
      </div>
    </header>
  );
}
