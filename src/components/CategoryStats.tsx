import { TaskItem, TaskCategory, Language } from '../types.ts';
import { CATEGORIES } from '../data/categories.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';

interface CategoryStatsProps {
  tasks: TaskItem[];
  selectedCategory: TaskCategory | 'all';
  onSelectCategory: (cat: TaskCategory | 'all') => void;
  lang: Language;
}

export function CategoryStats({
  tasks,
  selectedCategory,
  onSelectCategory,
  lang,
}: CategoryStatsProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div
      id="category-stats-bar"
      className="bg-white/80 dark:bg-gray-850 border border-emerald-100 dark:border-gray-800 rounded-3xl p-4 shadow-xs transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          {t.categoryStreaks}
        </h3>
        <button
          id="cat-filter-all"
          onClick={() => onSelectCategory('all')}
          className={`text-xs font-semibold px-2.5 py-1 rounded-xl transition-colors ${
            selectedCategory === 'all'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {t.viewAll} ({tasks.length})
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {CATEGORIES.map((cat) => {
          const catTasks = tasks.filter((item) => item.category === cat.id);
          const completed = catTasks.filter((item) => item.completed).length;
          const total = catTasks.length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              className={`text-left p-2.5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/40 ring-2 ring-emerald-300 dark:ring-emerald-600'
                  : 'border-gray-200 dark:border-gray-700/60 bg-white/70 dark:bg-gray-800/70 hover:bg-emerald-50/50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base">{cat.icon}</span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{pct}%</span>
              </div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate mb-1">
                {t.categories[cat.id] || cat.label}
              </p>
              <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {completed}/{total}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
