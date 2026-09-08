import { Activity, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { TaskItem, TaskCategory, Language } from '../types.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { matchesTimeHorizon } from '../utils/dates.ts';

interface FitnessStatsCardProps {
  tasks: TaskItem[];
  selectedCategory: TaskCategory | 'all';
  onSelectCategory: (cat: TaskCategory | 'all') => void;
  lang: Language;
}

export function FitnessStatsCard({
  tasks,
  selectedCategory,
  onSelectCategory,
  lang,
}: FitnessStatsCardProps) {
  const t = TRANSLATIONS[lang];
  const fitnessTasks = tasks.filter((task) => task.category === 'Sport & Fitness & Yoga');
  const completed = fitnessTasks.filter((task) => task.completed).length;
  const total = fitnessTasks.length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const thisWeek = fitnessTasks.filter(
    (task) => matchesTimeHorizon(task.dueDate, task.completed, 'this_week') || matchesTimeHorizon(task.dueDate, task.completed, 'today')
  ).length;
  const isSelected = selectedCategory === 'Sport & Fitness & Yoga';

  const statItems = [
    { label: t.fitnessSessionsDone, val: `${completed} / ${total}`, icon: CheckCircle2, color: 'text-teal-600' },
    { label: t.fitnessWeeklyGoal, val: `${thisWeek} sessions`, icon: Activity, color: 'text-emerald-600' },
    { label: t.fitnessRate, val: `${rate}%`, icon: Flame, color: 'text-amber-500' },
    { label: 'Routine Flow', val: rate >= 50 ? '🌟 Glowing' : '🌱 Building', icon: Sparkles, color: 'text-teal-500' },
  ];

  return (
    <div
      id="fitness-special-stats-card"
      className="bg-linear-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 dark:from-teal-950/40 dark:via-emerald-950/40 dark:to-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 rounded-3xl p-4 sm:p-5 shadow-xs transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl p-2 rounded-2xl bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200">🧘‍♀️</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">{t.fitnessCardTitle}</h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/70 dark:text-teal-200">Special</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t.fitnessCardSubtitle}</p>
          </div>
        </div>
        <button
          id="toggle-fitness-category-filter"
          onClick={() => onSelectCategory(isSelected ? 'all' : 'Sport & Fitness & Yoga')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
            isSelected
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white dark:bg-gray-800 text-teal-800 dark:text-teal-200 hover:bg-teal-100 border border-teal-300 dark:border-teal-700'
          }`}
        >
          {isSelected ? '✓ Showing Yoga & Sport' : 'Filter Yoga & Sport'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
        {statItems.map(({ label, val, icon: Icon, color }) => (
          <div key={label} className="bg-white/85 dark:bg-gray-800/80 rounded-2xl p-2.5 border border-teal-100 dark:border-teal-900/50">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>{label}</span>
              <Icon className={`w-3.5 h-3.5 ${color}`} />
            </div>
            <span className="text-lg font-black text-teal-900 dark:text-teal-100">{val}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center text-center text-xs text-teal-800 dark:text-teal-300 bg-teal-50/80 dark:bg-teal-950/40 rounded-xl px-3 py-2 border border-teal-100/60 dark:border-teal-900/40">
        <span className="w-full text-center font-medium">{t.fitnessMotivation}</span>
      </div>
    </div>
  );
}
