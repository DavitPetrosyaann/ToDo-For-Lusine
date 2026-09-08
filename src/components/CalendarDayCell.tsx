import { TaskItem } from '../types.ts';
import { CalendarDay } from '../utils/calendarUtils.ts';
import { PASTEL_COLORS } from '../data/colors.ts';

interface CalendarDayCellProps {
  key?: string;
  day: CalendarDay;
  tasks: TaskItem[];
  onClick: (dateStr: string) => void;
}

export function CalendarDayCell({ day, tasks, onClick }: CalendarDayCellProps) {
  const taskCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const isAllDone = taskCount > 0 && completedCount === taskCount;

  return (
    <button
      onClick={() => onClick(day.dateStr)}
      className={`min-h-[72px] sm:min-h-[82px] p-1.5 sm:p-2 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer group ${
        day.isCurrentMonth
          ? 'bg-white/80 dark:bg-gray-800/80 border-gray-150 dark:border-gray-700/60 hover:border-teal-400 hover:shadow-xs'
          : 'bg-gray-50/50 dark:bg-gray-900/40 border-gray-100 dark:border-gray-800/40 opacity-40 hover:opacity-75'
      } ${day.isToday ? 'ring-2 ring-teal-500 shadow-2xs' : ''}`}
    >
      <div className="flex items-center justify-between w-full">
        <span
          className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
            day.isToday
              ? 'bg-teal-600 text-white shadow-2xs'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {day.dayNumber}
        </span>

        {taskCount >= 2 && (
          <span
            className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
              isAllDone
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
            }`}
            title={`${taskCount} tasks on this day`}
          >
            {taskCount} {isAllDone ? '✓' : ''}
          </span>
        )}

        {taskCount === 1 && (
          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">
            {isAllDone ? '✓' : '1'}
          </span>
        )}
      </div>

      <div className="w-full mt-1 space-y-0.5">
        <div className="flex flex-wrap gap-1 items-center">
          {tasks.slice(0, 4).map((t) => {
            const colorMeta = PASTEL_COLORS[t.color] || PASTEL_COLORS.mint;
            return (
              <span
                key={t.id}
                className="w-2 h-2 rounded-full ring-1 ring-black/10 shrink-0"
                style={{ backgroundColor: colorMeta.dotColor }}
                title={t.title}
              />
            );
          })}
          {tasks.length > 4 && (
            <span className="text-[9px] text-gray-400 font-bold">+{tasks.length - 4}</span>
          )}
        </div>

        {tasks[0] && (
          <p className="text-[10px] truncate text-gray-600 dark:text-gray-300 font-medium hidden sm:block">
            {tasks[0].title}
          </p>
        )}
      </div>
    </button>
  );
}
