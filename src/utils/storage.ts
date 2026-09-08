import { TaskItem, Language, ThemeMode } from '../types.ts';
import { INITIAL_TASKS } from '../data/defaultTasks.ts';

const TASKS_KEY = 'lusine_todo_tasks_v4';
const PASSWORD_KEY = 'lusine_todo_app_password_v2';
const UNLOCKED_KEY = 'lusine_todo_app_unlocked_v2';
const LANG_KEY = 'lusine_todo_app_lang_v2';
const THEME_KEY = 'lusine_todo_app_theme_v2';

export const loadTasksFromStorage = (): TaskItem[] => {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading tasks:', err);
  }
  return INITIAL_TASKS;
};

export const saveTasksToStorage = (tasks: TaskItem[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Error saving tasks:', err);
  }
};

export const getSavedPassword = (): string => {
  try {
    return localStorage.getItem(PASSWORD_KEY) || 'lusine';
  } catch {
    return 'lusine';
  }
};

export const savePassword = (pw: string): void => {
  try {
    localStorage.setItem(PASSWORD_KEY, pw);
  } catch (err) {
    console.error('Error saving password:', err);
  }
};

export const isAppUnlocked = (): boolean => {
  try {
    return sessionStorage.getItem(UNLOCKED_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setAppUnlocked = (unlocked: boolean): void => {
  try {
    if (unlocked) sessionStorage.setItem(UNLOCKED_KEY, 'true');
    else sessionStorage.removeItem(UNLOCKED_KEY);
  } catch (err) {
    console.error('Error updating unlock status:', err);
  }
};

export const loadLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'hy' || saved === 'en') return saved;
  } catch {}
  return 'en';
};

export const saveLanguage = (lang: Language): void => {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
};

export const loadTheme = (): ThemeMode => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  return 'light';
};

export const saveTheme = (theme: ThemeMode): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
};
