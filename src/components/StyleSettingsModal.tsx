import { X, Sparkles, RotateCcw } from 'lucide-react';
import { PageStyleConfig, Language } from '../types.ts';
import { DEFAULT_STYLE_CONFIG } from '../data/pageStyles.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { ThemeStylePickers } from './ThemeStylePickers.tsx';

interface StyleSettingsModalProps {
  config: PageStyleConfig;
  onChangeConfig: (newConfig: PageStyleConfig) => void;
  onClose: () => void;
  lang: Language;
}

export function StyleSettingsModal({ config, onChangeConfig, onClose, lang }: StyleSettingsModalProps) {
  const t = TRANSLATIONS[lang];

  const handleUpdate = <K extends keyof PageStyleConfig>(key: K, val: PageStyleConfig[K]) => {
    onChangeConfig({ ...config, [key]: val });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 w-full max-w-lg shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">{t.settingsTitle}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.settingsSubtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <ThemeStylePickers config={config} onUpdate={handleUpdate} lang={lang} />

          <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/70 dark:border-gray-800">
            <div>
              <span className="text-xs font-bold text-gray-900 dark:text-gray-100 block">✨ {t.ambientGlowLabel}</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">Soft radiant backdrop glow effects</span>
            </div>
            <input
              type="checkbox"
              checked={config.ambientGlow}
              onChange={(e) => handleUpdate('ambientGlow', e.target.checked)}
              className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => onChangeConfig(DEFAULT_STYLE_CONFIG)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetDefault}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
}
