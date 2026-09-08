import { Language } from '../types.ts';
import { Dict } from './types.ts';
import { en } from './en.ts';
import { hy } from './hy.ts';

export type { Dict };

export const TRANSLATIONS: Record<Language, Dict> = {
  en,
  hy,
};
