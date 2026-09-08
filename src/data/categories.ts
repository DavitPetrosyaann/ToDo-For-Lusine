import { TaskCategory, PastelColor } from '../types.ts';

export interface CategoryMeta {
  id: TaskCategory;
  label: string;
  icon: string;
  badgeColor: string;
  defaultColor: PastelColor;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'Study & Learning',
    label: 'Study & Learning',
    icon: '📚',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800/60',
    defaultColor: 'buttercup',
  },
  {
    id: 'Hobbies & Crafts',
    label: 'Hobbies & Crafts',
    icon: '🎨',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800/60',
    defaultColor: 'mint',
  },
  {
    id: 'Self-Care',
    label: 'Self-Care',
    icon: '🌸',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800/60',
    defaultColor: 'sakura',
  },
  {
    id: 'Adventures',
    label: 'Adventures',
    icon: '🌿',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-800/60',
    defaultColor: 'sky',
  },
  {
    id: 'Daily Chores',
    label: 'Daily Chores',
    icon: '✨',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-200 dark:border-purple-800/60',
    defaultColor: 'lavender',
  },
  {
    id: 'Sport & Fitness & Yoga',
    label: 'Sport & Fitness & Yoga',
    icon: '🧘‍♀️',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/60 dark:text-teal-200 dark:border-teal-800/60',
    defaultColor: 'peach',
  },
];
