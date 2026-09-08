import { Check, Trash2, Edit3, Calendar } from 'lucide-react';
import { TaskItem as ITaskItem, Language } from '../types.ts';
import { PASTEL_COLORS } from '../data/colors.ts';
import { CATEGORIES } from '../data/categories.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { formatFriendlyDate } from '../utils/dates.ts';

interface TaskItemProps {
  key?: string;
  task: ITaskItem;
  onToggleComplete: (id: string) => void;
  onEdit: (task: ITaskItem) => void;
  onDelete: (id: string) => void;
  lang: Language;
}

export function TaskItem({ task, onToggleComplete, onEdit, onDelete, lang }: TaskItemProps) {
  const colorMeta = PASTEL_COLORS[task.color] || PASTEL_COLORS.mint;
  const categoryMeta = CATEGORIES.find((c) => c.id === task.category);
  const t = TRANSLATIONS[lang];
  const dateInfo = formatFriendlyDate(task.dueDate, lang);

  const dateBadgeStyle =
    dateInfo.status === 'overdue'
      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-700'
      : dateInfo.status === 'today'
      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-bold'
      : dateInfo.status === 'tomorrow'
      ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-300 dark:border-sky-700 font-bold'
      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';

  return (
    <div
      id={`task-item-${task.id}`}
      className={`rounded-2xl p-3.5 sm:p-4 border transition-all ${colorMeta.cardBg} ${colorMeta.cardBorder} ${task.completed ? 'opacity-75' : 'hover:shadow-xs'}`}
    >
      <div className="flex items-start gap-3">
        <input
          id={`checkbox-${task.id}`}
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="mt-1 w-5 h-5 rounded-md text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 cursor-pointer accent-emerald-600 shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${categoryMeta?.badgeColor || 'bg-gray-100 text-gray-700'}`}>
              {categoryMeta?.icon} {t.categories[task.category] || task.category}
            </span>
            {task.dueDate && (
              <span className={`text-[11px] px-2 py-0.5 rounded-md border flex items-center gap-1 ${dateBadgeStyle}`}>
                <Calendar className="w-3 h-3" />
                {dateInfo.text}
              </span>
            )}
            <button
              id={`done-btn-${task.id}`}
              type="button"
              onClick={() => onToggleComplete(task.id)}
              className={`text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                task.completed
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
              }`}
              title={task.completed ? 'Unmark done' : 'Mark done'}
            >
              <Check className="w-3 h-3 stroke-[3]" />
              <span>{t.doneBadge}</span>
            </button>
          </div>

          <h3 className={`text-sm sm:text-base font-bold break-words ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-xs sm:text-sm mt-1 break-words ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
              {task.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button id={`edit-btn-${task.id}`} onClick={() => onEdit(task)} className="p-1.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg" title="Edit">
            <Edit3 className="w-4 h-4" />
          </button>
          <button id={`delete-btn-${task.id}`} onClick={() => onDelete(task.id)} className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
