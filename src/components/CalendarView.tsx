import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { TaskItem, Language } from '../types.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { getMonthName, getCalendarDays, groupTasksByDate } from '../utils/calendarUtils.ts';
import { CalendarDayCell } from './CalendarDayCell.tsx';

interface CalendarViewProps {
  tasks: TaskItem[];
  lang: Language;
  onSelectDate: (dateStr: string) => void;
}

const WEEKDAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKDAYS_HY = ['Երկ', 'Երք', 'Չրք', 'Հնգ', 'Ուրբ', 'Շբթ', 'Կիր'];

export function CalendarView({ tasks, lang, onSelectDate }: CalendarViewProps) {
  const t = TRANSLATIONS[lang];
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const days = getCalendarDays(year, month);
  const tasksByDate = groupTasksByDate(tasks);
  const weekdays = lang === 'hy' ? WEEKDAYS_HY : WEEKDAYS_EN;

  const handlePrevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const handleNextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const handleGoToday = () => {
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-gray-200/80 dark:border-gray-800 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-2xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
              {getMonthName(month, lang)} {year}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t.calendarTitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={handleGoToday} className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 cursor-pointer">
            {lang === 'hy' ? 'Այսօր' : 'Today'}
          </button>
          <button onClick={handlePrevMonth} className="p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={handleNextMonth} className="p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
        {weekdays.map((w) => (
          <span key={w} className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-1">
            {w}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {days.map((day) => (
          <CalendarDayCell
            key={day.dateStr}
            day={day}
            tasks={tasksByDate[day.dateStr] || []}
            onClick={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
}
