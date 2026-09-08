import { PastelColor } from '../types.ts';

export interface ColorMeta {
  id: PastelColor;
  label: string;
  dotColor: string;
  cardBg: string;
  cardBorder: string;
  chipBg: string;
  order: number;
}

export const PASTEL_COLORS: Record<PastelColor, ColorMeta> = {
  mint: {
    id: 'mint',
    label: 'Mint',
    dotColor: '#a7f3d0',
    cardBg: 'bg-[#f0fdf4] dark:bg-[#062419]',
    cardBorder: 'border-[#bbf7d0] dark:border-[#0f5132]',
    chipBg: 'bg-[#dcfce7] dark:bg-[#0d3826]',
    order: 1,
  },
  peach: {
    id: 'peach',
    label: 'Peach',
    dotColor: '#fed7aa',
    cardBg: 'bg-[#fff7ed] dark:bg-[#2b180a]',
    cardBorder: 'border-[#ffedd5] dark:border-[#572e12]',
    chipBg: 'bg-[#ffedd5] dark:bg-[#3d1f0a]',
    order: 2,
  },
  lavender: {
    id: 'lavender',
    label: 'Lavender',
    dotColor: '#e9d5ff',
    cardBg: 'bg-[#faf5ff] dark:bg-[#201033]',
    cardBorder: 'border-[#f3e8ff] dark:border-[#4c2475]',
    chipBg: 'bg-[#f3e8ff] dark:bg-[#341652]',
    order: 3,
  },
  buttercup: {
    id: 'buttercup',
    label: 'Buttercup',
    dotColor: '#fef08a',
    cardBg: 'bg-[#fefce8] dark:bg-[#272205]',
    cardBorder: 'border-[#fef9c3] dark:border-[#524607]',
    chipBg: 'bg-[#fef08a] dark:bg-[#383007]',
    order: 4,
  },
  sky: {
    id: 'sky',
    label: 'Sky',
    dotColor: '#bae6fd',
    cardBg: 'bg-[#f0f9ff] dark:bg-[#081e33]',
    cardBorder: 'border-[#e0f2fe] dark:border-[#0f4066]',
    chipBg: 'bg-[#e0f2fe] dark:bg-[#0d2a45]',
    order: 5,
  },
  sakura: {
    id: 'sakura',
    label: 'Sakura',
    dotColor: '#fbcfe8',
    cardBg: 'bg-[#fdf2f8] dark:bg-[#2d0f20]',
    cardBorder: 'border-[#fce7f3] dark:border-[#591e3e]',
    chipBg: 'bg-[#fce7f3] dark:bg-[#3f132c]',
    order: 6,
  },
};
