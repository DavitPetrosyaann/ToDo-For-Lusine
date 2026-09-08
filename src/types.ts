export type PastelColor = 'mint' | 'peach' | 'lavender' | 'buttercup' | 'sky' | 'sakura';

export type TaskCategory =
  | 'Study & Learning'
  | 'Hobbies & Crafts'
  | 'Self-Care'
  | 'Adventures'
  | 'Daily Chores'
  | 'Sport & Fitness & Yoga';

export type SortCriteria = 'color' | 'text' | 'title' | 'description' | 'dueDate';
export type Language = 'en' | 'hy';
export type ThemeMode = 'light' | 'dark';
export type TimeHorizon = 'all' | 'today' | 'tomorrow' | 'this_week' | 'upcoming' | 'completed';

export type FontFamily =
  | 'Quicksand'
  | 'Nunito'
  | 'Outfit'
  | 'Plus Jakarta Sans'
  | 'Playfair Display'
  | 'Caveat'
  | 'Cinzel'
  | 'Comfortaa'
  | 'Lora'
  | 'Space Grotesk';

export type GradientTheme =
  | 'cotton'
  | 'lavender'
  | 'matcha'
  | 'sunrise'
  | 'ocean'
  | 'midnight'
  | 'eclipse'
  | 'shadow_forest'
  | 'blood_moon'
  | 'cosmic_abyss';

export type CardBorderRadius = 'rounded-2xl' | 'rounded-3xl' | 'rounded-xl';

export interface PageStyleConfig {
  fontFamily: FontFamily;
  gradientTheme: GradientTheme;
  cardRadius: CardBorderRadius;
  ambientGlow: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: TaskCategory;
  dueDate: string; // YYYY-MM-DD
  color: PastelColor;
  createdAt: number;
  completedAt?: number;
  isTop3?: boolean;
  time?: string;
}
