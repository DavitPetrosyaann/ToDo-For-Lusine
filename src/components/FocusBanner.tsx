import { Language } from '../types.ts';

interface FocusBannerProps {
  isFocusMode: boolean;
  onExit: () => void;
  lang: Language;
}

export function FocusBanner({ isFocusMode, onExit, lang }: FocusBannerProps) {
  if (!isFocusMode) return null;
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200">
      <span className="text-xs font-semibold flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
        {lang === 'hy'
          ? 'Կենտրոնացման ռեժիմը ակտիվ է • Ցուցադրվում են միայն առաջադրանքները'
          : 'Focus Mode Active • Only active task list is visible'}
      </span>
      <button
        onClick={onExit}
        className="text-xs font-bold underline cursor-pointer hover:opacity-80"
      >
        {lang === 'hy' ? 'Դուրս գալ' : 'Exit Focus'}
      </button>
    </div>
  );
}
