import { TaskItem, Language } from '../types.ts';

export interface CalendarDay {
  dateStr: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_NAMES_HY = [
  'Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս',
  'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր',
];

export function getMonthName(month: number, lang: Language): string {
  return lang === 'hy' ? MONTH_NAMES_HY[month] : MONTH_NAMES_EN[month];
}

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const todayStr = new Date().toISOString().split('T')[0];

  const days: CalendarDay[] = [];
  // Adjust Monday as first day of week (0 = Monday, 6 = Sunday)
  const startDayIndex = (firstDay.getDay() + 6) % 7;

  // Previous month fill
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayIndex - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i;
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({ dateStr, dayNumber: d, isCurrentMonth: false, isToday: dateStr === todayStr });
  }

  // Current month days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({ dateStr, dayNumber: d, isCurrentMonth: true, isToday: dateStr === todayStr });
  }

  // Next month fill to complete full weeks (multiples of 7)
  const remaining = (7 - (days.length % 7)) % 7;
  for (let d = 1; d <= remaining; d++) {
    const m = month === 11 ? 0 : month + 1;
    const y = month === 11 ? year + 1 : year;
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({ dateStr, dayNumber: d, isCurrentMonth: false, isToday: dateStr === todayStr });
  }

  return days;
}

export function groupTasksByDate(tasks: TaskItem[]): Record<string, TaskItem[]> {
  const map: Record<string, TaskItem[]> = {};
  for (const t of tasks) {
    if (!map[t.dueDate]) map[t.dueDate] = [];
    map[t.dueDate].push(t);
  }
  return map;
}
