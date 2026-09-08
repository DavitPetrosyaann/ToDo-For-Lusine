import { Palette, AlignLeft, Type, FileText, Calendar, ArrowUpDown } from 'lucide-react';
import { SortCriteria, Language } from '../types.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';

interface SortBarProps {
  currentSort: SortCriteria;
  sortAsc: boolean;
  onSelectSort: (criteria: SortCriteria) => void;
  onToggleAsc: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  lang: Language;
}

const SORT_ICONS: Record<SortCriteria, typeof Palette> = {
  color: Palette,
  text: AlignLeft,
  title: Type,
  description: FileText,
  dueDate: Calendar,
};

const SORTS: SortCriteria[] = ['color', 'text', 'title', 'description', 'dueDate'];

export function SortBar({
  currentSort,
  sortAsc,
  onSelectSort,
  onToggleAsc,
  searchQuery,
  onSearchChange,
  lang,
}: SortBarProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div
      id="sort-and-search-bar"
      className="bg-white/80 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors"
    >
      <div className="relative flex-1">
        <input
          id="task-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 mr-1">
          {t.sortBy}
        </span>
        {SORTS.map((s) => {
          const Icon = SORT_ICONS[s];
          const isActive = currentSort === s;
          return (
            <button
              key={s}
              id={`sort-${s}-btn`}
              onClick={() => onSelectSort(s)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.sorts[s]}</span>
            </button>
          );
        })}

        <button
          id="toggle-sort-direction-btn"
          onClick={onToggleAsc}
          className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ml-1"
          title={sortAsc ? 'Asc' : 'Desc'}
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span className="text-[11px]">{sortAsc ? 'Asc' : 'Desc'}</span>
        </button>
      </div>
    </div>
  );
}
