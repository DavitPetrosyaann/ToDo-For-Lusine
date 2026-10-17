import { useState, FormEvent } from 'react';
import { TaskItem, TaskCategory, PastelColor, Language } from '../types.ts';
import { CATEGORIES } from '../data/categories.ts';
import { ColorPickerRow } from './ColorPickerRow.tsx';
import { TRANSLATIONS } from '../i18n/translations.ts';
import { getDateOffset } from '../utils/dates.ts';
import { useScrollLock } from '../hooks/useScrollLock.ts';

interface TaskFormModalProps {
  initialTask?: TaskItem | null;
  defaultDueDate?: string;
  onSave: (data: Omit<TaskItem, 'id' | 'createdAt' | 'completed' | 'completedAt'>) => void;
  onClose: () => void;
  lang: Language;
}

export function TaskFormModal({ initialTask, defaultDueDate, onSave, onClose, lang }: TaskFormModalProps) {
  const t = TRANSLATIONS[lang];
  useScrollLock(true);
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [category, setCategory] = useState<TaskCategory>(initialTask?.category || 'Study & Learning');
  const [color, setColor] = useState<PastelColor>(initialTask?.color || 'mint');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || defaultDueDate || getDateOffset(0));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), description: description.trim(), category, color, dueDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white dark:bg-gray-850 rounded-3xl w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col overflow-hidden">
        <div className="shrink-0 px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {initialTask ? `✏️ ${t.editTask}` : `🌸 ${t.newTask}`}
          </h2>
        </div>

        <form id="task-form" onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.titleInput}
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-400 outline-none"
            />
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descInput}
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-400 outline-none"
            />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                <span>{t.categoryLabel} & {t.dueDateLabel}</span>
                <div className="flex items-center gap-1 font-normal text-[11px]">
                  <button type="button" onClick={() => setDueDate(getDateOffset(0))} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 text-gray-700 dark:text-gray-300">{t.quickToday}</button>
                  <button type="button" onClick={() => setDueDate(getDateOffset(1))} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 text-gray-700 dark:text-gray-300">{t.quickTomorrow}</button>
                  <button type="button" onClick={() => setDueDate(getDateOffset(7))} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 text-gray-700 dark:text-gray-300">{t.quickNextWeek}</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TaskCategory)}
                  className="text-xs p-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {t.categories[c.id] || c.label}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="text-xs p-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>
            <ColorPickerRow label={t.colorLabel} value={color} onChange={setColor} />
          </div>

          <div className="shrink-0 flex items-center justify-end gap-2 pt-3 px-5 pb-5 border-t border-gray-100 dark:border-gray-800">
            <button type="button" onClick={onClose} className="px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400">{t.cancel}</button>
            <button type="submit" className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl">{t.save}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
