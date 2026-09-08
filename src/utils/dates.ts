import { Language, TimeHorizon } from '../types.ts';

export function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getDaysDiffFromToday(dateStr: string): number {
  if (!dateStr) return 999;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  const diffTime = target.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export function matchesTimeHorizon(dueDate: string, completed: boolean, horizon: TimeHorizon): boolean {
  if (horizon === 'completed') return completed;
  if (horizon === 'all') return true;
  if (!dueDate) return horizon === 'upcoming';
  const diff = getDaysDiffFromToday(dueDate);
  if (horizon === 'today') return diff === 0;
  if (horizon === 'tomorrow') return diff === 1;
  if (horizon === 'this_week') return diff >= 0 && diff <= 7;
  if (horizon === 'upcoming') return diff > 7;
  return true;
}

export function formatFriendlyDate(dateStr: string, lang: Language): { text: string; status: 'overdue' | 'today' | 'tomorrow' | 'soon' | 'later' } {
  if (!dateStr) return { text: lang === 'hy' ? 'Առանց ամսաթվի' : 'No date', status: 'later' };
  const diff = getDaysDiffFromToday(dateStr);
  const isHy = lang === 'hy';
  if (diff < 0) {
    return { text: isHy ? `Ժամկետանց (${Math.abs(diff)} օր)` : `Overdue (${Math.abs(diff)}d)`, status: 'overdue' };
  }
  if (diff === 0) return { text: isHy ? 'Այսօր' : 'Today', status: 'today' };
  if (diff === 1) return { text: isHy ? 'Վաղը' : 'Tomorrow', status: 'tomorrow' };
  if (diff <= 7) return { text: isHy ? `${diff} օրից` : `In ${diff} days`, status: 'soon' };
  return { text: dateStr, status: 'later' };
}
