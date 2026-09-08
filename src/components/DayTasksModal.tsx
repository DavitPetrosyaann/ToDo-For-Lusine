import { X, Plus, Calendar } from 'lucide-react';
import { TaskItem, Language } from '../types.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { DayTaskItem } from './DayTaskItem.tsx';

interface DayTasksModalProps {
  dateStr: string;
  tasks: TaskItem[];
  lang: Language;
  onToggleTask: (id: string) => void;
  onEditTask: (task: TaskItem) => void;
  onDeleteTask: (id: string) => void;
  onAddNewForDate: (dateStr: string) => void;
  onClose: () => void;
}

export function DayTasksModal({
  dateStr, tasks, lang, onToggleTask, onEditTask, onDeleteTask, onAddNewForDate, onClose,
}: DayTasksModalProps) {
  const t = TRANSLATIONS[lang];
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 w-full max-w-lg shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">{t.dayTasksTitle} {dateStr}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.allDayTasksDesc(tasks.length, completedCount)}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-3 flex-1 overflow-y-auto space-y-2.5">
          {tasks.length === 0 ? (
            <p className="text-center py-8 text-xs text-gray-400">{t.noTasksForDate}</p>
          ) : (
            tasks.map((task) => (
              <DayTaskItem
                key={task.id}
                task={task}
                lang={lang}
                onToggle={onToggleTask}
                onEdit={(taskToEdit) => { onEditTask(taskToEdit); onClose(); }}
                onDelete={onDeleteTask}
              />
            ))
          )}
        </div>

        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0">
          <button
            onClick={() => { onAddNewForDate(dateStr); onClose(); }}
            className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 hover:underline cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addTaskForDate}</span>
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-xl cursor-pointer">
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
