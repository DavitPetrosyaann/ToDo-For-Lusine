import { CheckCircle2, Circle, Edit3, Trash2 } from 'lucide-react';
import { TaskItem, Language } from '../types.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { PASTEL_COLORS } from '../data/colors.ts';

interface DayTaskItemProps {
  key?: string;
  task: TaskItem;
  lang: Language;
  onToggle: (id: string) => void;
  onEdit: (task: TaskItem) => void;
  onDelete: (id: string) => void;
}

export function DayTaskItem({ task, lang, onToggle, onEdit, onDelete }: DayTaskItemProps) {
  const t = TRANSLATIONS[lang];
  const color = PASTEL_COLORS[task.color] || PASTEL_COLORS.mint;

  return (
    <div
      className={`p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 ${color.cardBg} ${color.cardBorder} ${task.completed ? 'opacity-75' : ''}`}
    >
      <button
        onClick={() => onToggle(task.id)}
        className="mt-0.5 text-teal-600 dark:text-teal-400 hover:scale-110 transition-transform cursor-pointer shrink-0"
      >
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-sm font-bold text-gray-900 dark:text-gray-100 ${task.completed ? 'line-through opacity-60' : ''}`}>
            {task.title}
          </span>
          {task.completed && (
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-emerald-200/80 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-md">
              {t.doneBadge}
            </span>
          )}
        </div>
        {task.description && (
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{task.description}</p>
        )}
        <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-300">
          {t.categories[task.category]}
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button onClick={() => onEdit(task)} className="p-1.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer">
          <Edit3 className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDelete(task.id)} className="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
