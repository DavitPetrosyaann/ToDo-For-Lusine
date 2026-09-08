import { Plus, KeyRound, Lock, Settings, Target, Calendar } from 'lucide-react';
import { Language, ThemeMode } from '../types.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { LanguageToggle } from './LanguageToggle.tsx';
import { ThemeToggle } from './ThemeToggle.tsx';

interface HeaderActionsProps {
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

export function HeaderActions({
  lang, theme, isFocusMode, viewMode, onSelectLang, onToggleTheme, onToggleFocusMode,
  onToggleViewMode, onOpenNewTask, onLockApp, onOpenPasswordSettings, onOpenStyleSettings,
}: HeaderActionsProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <LanguageToggle currentLang={lang} onSelectLang={onSelectLang} />
      <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

      <button
        id="calendar-toggle-btn"
        onClick={onToggleViewMode}
        className={`p-2 rounded-xl transition-colors cursor-pointer ${
          viewMode === 'calendar'
            ? 'bg-teal-600 text-white shadow-xs'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        title={t.calendar}
      >
        <Calendar className="w-4 h-4" />
      </button>

      <button
        id="focus-mode-btn"
        onClick={onToggleFocusMode}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
          isFocusMode
            ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 animate-pulse'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60'
        }`}
        title={isFocusMode ? t.exitFocusMode : t.focusMode}
      >
        <Target className={`w-4 h-4 ${isFocusMode ? 'animate-spin' : ''}`} />
        <span className="hidden md:inline">{isFocusMode ? t.exitFocusMode : t.focusMode}</span>
      </button>

      <button
        id="style-settings-btn"
        onClick={onOpenStyleSettings}
        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
        title={t.settingsTitle}
      >
        <Settings className="w-4 h-4" />
      </button>

      <button
        id="add-task-header-btn"
        onClick={onOpenNewTask}
        className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden xs:inline">{t.newTask}</span>
      </button>

      <button
        id="password-settings-btn"
        onClick={onOpenPasswordSettings}
        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
        title={t.passcode}
      >
        <KeyRound className="w-4 h-4" />
      </button>

      <button
        id="lock-app-btn"
        onClick={onLockApp}
        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
        title={t.lock}
      >
        <Lock className="w-4 h-4" />
      </button>
    </div>
  );
}
