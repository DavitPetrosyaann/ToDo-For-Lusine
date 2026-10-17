import { useEffect, useState } from 'react';
import { Language, TaskItem } from '../types.ts';
import { ReminderSyncResult, syncReminderTasks } from '../services/reminderSync.ts';

const DEBOUNCE_MS = 2000;

/** Debounced background sync of tasks for Telegram reminders. Failures never block the UI. */
export function useReminderSync(tasks: TaskItem[], lang: Language) {
  const [state, setState] = useState<ReminderSyncResult | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const result = await syncReminderTasks(tasks, lang);
        if (!cancelled) { setState(result); setError(false); }
      } catch (err) {
        console.warn('Telegram reminder sync failed:', err);
        if (!cancelled) setError(true);
      }
    }, DEBOUNCE_MS);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [tasks, lang]);

  return { linked: state?.linked ?? false, connectUrl: state?.connectUrl ?? null, error };
}
