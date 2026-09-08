import { TaskItem as ITaskItem, Language } from '../types.ts';
import { TaskItem } from './TaskItem.tsx';
import { TRANSLATIONS } from '../i18n/translations.ts';

interface TaskListProps {
  tasks: ITaskItem[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: ITaskItem) => void;
  onDelete: (id: string) => void;
  onOpenNewTask: () => void;
  lang: Language;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onOpenNewTask,
  lang,
}: TaskListProps) {
  const t = TRANSLATIONS[lang];

  if (tasks.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 text-center shadow-xs transition-colors">
        <div className="text-4xl mb-2">🌸✨📝</div>
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
          {t.emptyTitle}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-4">
          {t.emptyDesc}
        </p>
        <button
          onClick={onOpenNewTask}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-xs transition-colors"
        >
          {t.addCuteTask} 🌸
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          lang={lang}
        />
      ))}
    </div>
  );
}
