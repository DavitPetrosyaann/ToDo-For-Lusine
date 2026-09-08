import { motion } from 'motion/react';
import { Language, TimeHorizon } from '../types.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';

interface ProgressBarProps {
  completedCount: number;
  totalCount: number;
  horizon: TimeHorizon;
  lang: Language;
}

export function ProgressBar({ completedCount, totalCount, horizon, lang }: ProgressBarProps) {
  const t = TRANSLATIONS[lang];
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const heading = t.progressTitle[horizon] || t.progressTitle.all;

  return (
    <div
      id="progress-widget"
      className="bg-white/90 dark:bg-gray-850 border border-emerald-100 dark:border-gray-800 rounded-3xl p-4 sm:p-5 shadow-xs transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {t.subtitle}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            {heading}
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {percentage}%
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {t.completedOf(completedCount, totalCount)}
          </p>
        </div>
      </div>

      <div className="relative w-full h-3.5 bg-emerald-100/60 dark:bg-gray-700/80 rounded-full overflow-hidden mb-2">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-400 transition-all duration-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-medium">
        <span>
          {percentage === 100
            ? '🎉 All tasks done! Wonderful work, Lusine!'
            : percentage >= 50
            ? '✨ Halfway through your goals! Keep going!'
            : '🌱 Every small step counts towards your goals.'}
        </span>
        <span className="text-sm">🌸</span>
      </div>
    </div>
  );
}
