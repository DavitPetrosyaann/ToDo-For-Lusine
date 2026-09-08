import { TaskItem, Language, PageStyleConfig } from '../types.ts';
import { TaskFormModal } from './TaskFormModal.tsx';
import { PasswordSettingsModal } from './PasswordSettingsModal.tsx';
import { StyleSettingsModal } from './StyleSettingsModal.tsx';
import { DayTasksModal } from './DayTasksModal.tsx';

interface ModalsContainerProps {
  isTaskModalOpen: boolean;
  editingTask: TaskItem | null;
  defaultDueDate?: string;
  isPasswordModalOpen: boolean;
  isStyleModalOpen: boolean;
  selectedCalendarDate: string | null;
  calendarDateTasks: TaskItem[];
  pageStyleConfig: PageStyleConfig;
  onSaveTask: (data: Omit<TaskItem, 'id' | 'createdAt' | 'completed' | 'completedAt'>) => void;
  onCloseTaskModal: () => void;
  onClosePasswordModal: () => void;
  onCloseStyleModal: () => void;
  onCloseCalendarModal: () => void;
  onToggleTask: (id: string) => void;
  onEditTask: (task: TaskItem) => void;
  onDeleteTask: (id: string) => void;
  onAddNewForDate: (dateStr: string) => void;
  onChangeStyleConfig: (cfg: PageStyleConfig) => void;
  lang: Language;
}

export function ModalsContainer({
  isTaskModalOpen, editingTask, defaultDueDate, isPasswordModalOpen, isStyleModalOpen,
  selectedCalendarDate, calendarDateTasks, pageStyleConfig, onSaveTask,
  onCloseTaskModal, onClosePasswordModal, onCloseStyleModal, onCloseCalendarModal,
  onToggleTask, onEditTask, onDeleteTask, onAddNewForDate, onChangeStyleConfig, lang,
}: ModalsContainerProps) {
  return (
    <>
      {isTaskModalOpen && (
        <TaskFormModal
          initialTask={editingTask}
          defaultDueDate={defaultDueDate}
          onSave={onSaveTask}
          onClose={onCloseTaskModal}
          lang={lang}
        />
      )}
      {isPasswordModalOpen && (
        <PasswordSettingsModal onClose={onClosePasswordModal} lang={lang} />
      )}
      {isStyleModalOpen && (
        <StyleSettingsModal
          config={pageStyleConfig}
          onChangeConfig={onChangeStyleConfig}
          onClose={onCloseStyleModal}
          lang={lang}
        />
      )}
      {selectedCalendarDate && (
        <DayTasksModal
          dateStr={selectedCalendarDate}
          tasks={calendarDateTasks}
          lang={lang}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onAddNewForDate={onAddNewForDate}
          onClose={onCloseCalendarModal}
        />
      )}
    </>
  );
}
