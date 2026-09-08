import { GradientTheme } from '../types.ts';

interface AmbientBackdropProps {
  enabled: boolean;
  theme: GradientTheme;
}

export function AmbientBackdrop({ enabled, theme }: AmbientBackdropProps) {
  if (!enabled) return null;

  const isMysterious = ['eclipse', 'shadow_forest', 'blood_moon', 'cosmic_abyss', 'midnight'].includes(theme);

  if (isMysterious) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-purple-900/25 dark:bg-purple-600/15 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-indigo-900/25 dark:bg-indigo-600/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[28rem] h-[28rem] rounded-full bg-rose-950/25 dark:bg-rose-900/15 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="absolute -top-28 -left-28 w-96 h-96 rounded-full bg-teal-400/15 dark:bg-teal-600/10 blur-3xl" />
      <div className="absolute top-1/3 -right-28 w-96 h-96 rounded-full bg-pink-400/15 dark:bg-purple-600/10 blur-3xl" />
      <div className="absolute -bottom-28 left-1/3 w-96 h-96 rounded-full bg-amber-300/15 dark:bg-amber-600/10 blur-3xl" />
    </div>
  );
}
