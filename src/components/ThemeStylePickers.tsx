import { useState } from 'react';
import { PageStyleConfig, Language, GradientTheme, FontFamily } from '../types.ts';
import { GRADIENT_THEMES, FONT_OPTIONS } from '../data/pageStyles.ts';

interface ThemeStylePickersProps {
  config: PageStyleConfig;
  onUpdate: <K extends keyof PageStyleConfig>(key: K, val: PageStyleConfig[K]) => void;
  lang: Language;
}

export function ThemeStylePickers({ config, onUpdate, lang }: ThemeStylePickersProps) {
  const [filterVibe, setFilterVibe] = useState<'all' | 'bright' | 'mysterious'>('all');

  const filteredThemes = filterVibe === 'all'
    ? GRADIENT_THEMES
    : GRADIENT_THEMES.filter((t) => t.vibe === filterVibe);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            🎨 {lang === 'hy' ? 'Գրադիենտ Թեմա' : 'Gradient Theme'}
          </label>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg text-[11px] font-semibold">
            <button
              onClick={() => setFilterVibe('all')}
              className={`px-2 py-0.5 rounded-md cursor-pointer ${filterVibe === 'all' ? 'bg-white dark:bg-gray-700 shadow-2xs text-teal-800 dark:text-teal-200' : 'text-gray-500'}`}
            >
              {lang === 'hy' ? 'Բոլորը' : 'All'}
            </button>
            <button
              onClick={() => setFilterVibe('bright')}
              className={`px-2 py-0.5 rounded-md cursor-pointer ${filterVibe === 'bright' ? 'bg-white dark:bg-gray-700 shadow-2xs text-teal-800 dark:text-teal-200' : 'text-gray-500'}`}
            >
              🌸 {lang === 'hy' ? 'Պայծառ' : 'Bright'}
            </button>
            <button
              onClick={() => setFilterVibe('mysterious')}
              className={`px-2 py-0.5 rounded-md cursor-pointer ${filterVibe === 'mysterious' ? 'bg-white dark:bg-gray-700 shadow-2xs text-purple-700 dark:text-purple-300' : 'text-gray-500'}`}
            >
              🔮 {lang === 'hy' ? 'Խորհրդավոր' : 'Mysterious'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
          {filteredThemes.map((theme) => {
            const isActive = config.gradientTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onUpdate('gradientTheme', theme.id as GradientTheme)}
                className={`p-2 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-purple-500 ring-2 ring-purple-400/50 shadow-xs'
                    : 'border-gray-200 dark:border-gray-800 hover:border-purple-300'
                }`}
              >
                <div className={`h-7 w-full rounded-xl mb-1 bg-linear-to-r ${theme.preview} border border-black/10`} />
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block truncate">
                  {theme.vibe === 'mysterious' ? '🔮 ' : '🌸 '}
                  {lang === 'hy' ? theme.hyName : theme.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-2">
          ✍️ {lang === 'hy' ? 'Տառատեսակ (Font)' : 'Font Family'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
          {FONT_OPTIONS.map((f) => (
            <button
              key={f.id}
              onClick={() => onUpdate('fontFamily', f.id as FontFamily)}
              style={{ fontFamily: f.id }}
              className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                config.fontFamily === f.id
                  ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-bold ring-1 ring-teal-400'
                  : 'border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="text-sm font-bold">{f.label}</div>
              <div className="text-[11px] opacity-75">{f.sample}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
