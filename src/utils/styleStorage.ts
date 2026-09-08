import { PageStyleConfig } from '../types.ts';
import { DEFAULT_STYLE_CONFIG } from '../data/pageStyles.ts';

const STYLE_KEY = 'lusine_todo_app_style_v1';

export const loadStyleConfig = (): PageStyleConfig => {
  try {
    const raw = localStorage.getItem(STYLE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_STYLE_CONFIG, ...parsed };
    }
  } catch (err) {
    console.error('Error loading style config:', err);
  }
  return DEFAULT_STYLE_CONFIG;
};

export const saveStyleConfig = (config: PageStyleConfig): void => {
  try {
    localStorage.setItem(STYLE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Error saving style config:', err);
  }
};
