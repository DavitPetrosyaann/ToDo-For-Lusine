import { PageStyleConfig, FontFamily } from '../types.ts';
export { GRADIENT_THEMES } from './pageThemes.ts';

export const FONT_OPTIONS: { id: FontFamily; label: string; sample: string }[] = [
  { id: 'Quicksand', label: 'Quicksand', sample: 'Cute & Rounded (Default)' },
  { id: 'Cinzel', label: 'Cinzel', sample: '🌙 Mysterious Lunar Serif' },
  { id: 'Caveat', label: 'Caveat', sample: '✨ Handwritten Diary Script' },
  { id: 'Comfortaa', label: 'Comfortaa', sample: '🫧 Bubbly & Soft Curves' },
  { id: 'Playfair Display', label: 'Playfair', sample: '🥀 Dark Romantic Serif' },
  { id: 'Nunito', label: 'Nunito', sample: '🧸 Playful & Friendly' },
  { id: 'Outfit', label: 'Outfit', sample: '⚡ Modern & Geometric' },
  { id: 'Lora', label: 'Lora', sample: '📖 Cozy Literary Serif' },
  { id: 'Space Grotesk', label: 'Space Grotesk', sample: '🪐 Cosmic Modern Tech' },
  { id: 'Plus Jakarta Sans', label: 'Plus Jakarta', sample: '💎 Clean & Minimalist' },
];

export const DEFAULT_STYLE_CONFIG: PageStyleConfig = {
  fontFamily: 'Quicksand',
  gradientTheme: 'cotton',
  cardRadius: 'rounded-3xl',
  ambientGlow: true,
};
