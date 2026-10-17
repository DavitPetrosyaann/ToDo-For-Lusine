/**
 * Mirrors tasks to the `todoLusineSync` Cloud Function so the server can send Telegram
 * deadline reminders. localStorage remains the app's source of truth.
 * Identity = a random 256-bit per-device key kept in localStorage (server stores only its hash).
 */
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebaseClient.ts';
import { Language, TaskItem } from '../types.ts';

const DEVICE_KEY = 'lusine_todo_reminder_key_v1';

export interface ReminderSyncResult {
  linked: boolean;
  connectUrl: string | null;
}

interface SyncPayload {
  deviceKey: string;
  lang: Language;
  tasks: Array<Pick<TaskItem, 'id' | 'title' | 'dueDate' | 'completed'>>;
}

const callSync = httpsCallable<SyncPayload, ReminderSyncResult>(functions, 'todoLusineSync');

function getDeviceKey(): string {
  const existing = localStorage.getItem(DEVICE_KEY);
  if (existing && /^[a-f0-9]{64}$/.test(existing)) return existing;
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const key = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  localStorage.setItem(DEVICE_KEY, key);
  return key;
}

export async function syncReminderTasks(tasks: TaskItem[], lang: Language): Promise<ReminderSyncResult> {
  const payload: SyncPayload = {
    deviceKey: getDeviceKey(),
    lang,
    tasks: tasks.map(({ id, title, dueDate, completed }) => ({ id, title, dueDate, completed })),
  };
  const { data } = await callSync(payload);
  return data;
}
