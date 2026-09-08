import { Calendar, Clock, Sun, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { TimeHorizon, Language, TaskItem } from '../types.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { matchesTimeHorizon } from '../utils/dates.ts';

interface TimelineFilterProps {
  currentHorizon: TimeHorizon;
  onSelectHorizon: (horizon: TimeHorizon) => void;
  tasks: TaskItem[];
  lang: Language;
}

const HORIZONS: { id: TimeHorizon; icon: typeof Layers }[] = [
  { id: 'all', icon: Layers },
  { id: 'today', icon: Sun },
  { id: 'tomorrow', icon: Clock },
  { id: 'this_week', icon: Calendar },
  { id: 'upcoming', icon: Sparkles },
  { id: 'completed', icon: CheckCircle2 },
];

export function TimelineFilter({ currentHorizon, onSelectHorizon, tasks, lang }: TimelineFilterProps) {
  const t = TRANSLATIONS[lang];

  const counts: Record<TimeHorizon, number> = {
    all: tasks.length,
    today: tasks.filter((task) => !task.completed && matchesTimeHorizon(task.dueDate, task.completed, 'today')).length,
    tomorrow: tasks.filter((task) => !task.completed && matchesTimeHorizon(task.dueDate, task.completed, 'tomorrow')).length,
    this_week: tasks.filter((task) => !task.completed && matchesTimeHorizon(task.dueDate, task.completed, 'this_week')).length,
    upcoming: tasks.filter((task) => !task.completed && matchesTimeHorizon(task.dueDate, task.completed, 'upcoming')).length,
    completed: tasks.filter((task) => task.completed).length,
  };

  return (
    <div className="bg-white/85 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl p-2 sm:p-2.5 shadow-xs transition-colors">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {HORIZONS.map(({ id, icon: Icon }) => {
          const isActive = currentHorizon === id;
          const count = counts[id];

          return (
            <button
              key={id}
              id={`timeline-tab-${id}`}
              onClick={() => onSelectHorizon(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{t.timeHorizons[id]}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
