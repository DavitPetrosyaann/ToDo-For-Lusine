import { BellRing, Send, CheckCircle2 } from 'lucide-react';
import { Language, TaskItem } from '../types.ts';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { useReminderSync } from '../hooks/useReminderSync.ts';

interface TelegramReminderBarProps {
  tasks: TaskItem[];
  lang: Language;
}

export function TelegramReminderBar({ tasks, lang }: TelegramReminderBarProps) {
  const t = TRANSLATIONS[lang];
  const { linked, connectUrl } = useReminderSync(tasks, lang);

  if (linked) {
    return (
      <div id="telegram-reminders-on" className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
        <CheckCircle2 className="w-4 h-4" />
        <span>{t.telegramConnected}</span>
      </div>
    );
  }
  if (!connectUrl) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-sky-50/90 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-xs text-sky-900 dark:text-sky-100">
        <BellRing className="w-4 h-4 shrink-0" />
        <span>{t.telegramConnectCta}</span>
      </div>
      <a
        id="telegram-connect-btn"
        href={connectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors"
      >
        <Send className="w-3.5 h-3.5" />
        {t.telegramConnectButton}
      </a>
    </div>
  );
}
