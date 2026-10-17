import { useState, useEffect } from 'react';
import { TaskItem, TaskCategory, SortCriteria, Language, ThemeMode, TimeHorizon, PageStyleConfig } from './types.ts';
import { isAppUnlocked, setAppUnlocked, loadLanguage, saveLanguage, loadTheme, saveTheme } from './utils/storage.ts';
import { loadStyleConfig, saveStyleConfig } from './utils/styleStorage.ts';
import { GRADIENT_THEMES } from './data/pageStyles.ts';
import { useTasks } from './hooks/useTasks.ts';
import { useFilteredTasks } from './hooks/useFilteredTasks.ts';
import { Header } from './components/Header.tsx';
import { ModalsContainer } from './components/ModalsContainer.tsx';
import { PasswordGate } from './components/PasswordGate.tsx';
import { AmbientBackdrop } from './components/AmbientBackdrop.tsx';
import { FocusBanner } from './components/FocusBanner.tsx';
import { DashboardContent } from './components/DashboardContent.tsx';
import { TelegramReminderBar } from './components/TelegramReminderBar.tsx';

export default function App() {
  const [unlocked, setUnlocked] = useState(() => isAppUnlocked());
  const [lang, setLang] = useState<Language>(() => loadLanguage());
  const [theme, setTheme] = useState<ThemeMode>(() => loadTheme());
  const [styleConfig, setStyleConfig] = useState<PageStyleConfig>(() => loadStyleConfig());
  const [currentSort, setCurrentSort] = useState<SortCriteria>('color'); const [sortAsc, setSortAsc] = useState(true);
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('all'); const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false); const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [defaultDueDate, setDefaultDueDate] = useState<string | undefined>(undefined);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false); const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  const { tasks, toggleTask, addTask, updateTask, deleteTask } = useTasks();
  const { filteredTasks, horizonStats } = useFilteredTasks({
    tasks, selectedCategory, timeHorizon, searchQuery, currentSort, sortAsc,
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    saveTheme(theme);
  }, [theme]);

  useEffect(() => { saveStyleConfig(styleConfig); }, [styleConfig]);

  const handleSelectLang = (l: Language) => { setLang(l); saveLanguage(l); };
  const toggleTheme = () => setTheme((p) => (p === 'light' ? 'dark' : 'light'));
  const activeBg = GRADIENT_THEMES.find((t) => t.id === styleConfig.gradientTheme) || GRADIENT_THEMES[0];
  const calendarTasks = selectedCalendarDate ? tasks.filter((t) => t.dueDate === selectedCalendarDate) : [];

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} lang={lang} theme={theme} onSelectLang={handleSelectLang} onToggleTheme={toggleTheme} />;
  }

  return (
    <div style={{ fontFamily: styleConfig.fontFamily }} className={`min-h-screen ${activeBg.lightBg} ${activeBg.darkBg} text-gray-900 dark:text-gray-100 flex flex-col pb-12 transition-all relative overflow-x-hidden`}>
      <AmbientBackdrop enabled={styleConfig.ambientGlow} theme={styleConfig.gradientTheme} />
      <Header
        lang={lang} theme={theme} isFocusMode={isFocusMode} viewMode={viewMode}
        onSelectLang={handleSelectLang} onToggleTheme={toggleTheme}
        onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
        onToggleViewMode={() => setViewMode((v) => (v === 'list' ? 'calendar' : 'list'))}
        onOpenNewTask={() => { setDefaultDueDate(undefined); setEditingTask(null); setIsTaskModalOpen(true); }}
        onLockApp={() => { setAppUnlocked(false); setUnlocked(false); }}
        onOpenPasswordSettings={() => setIsPasswordModalOpen(true)}
        onOpenStyleSettings={() => setIsStyleModalOpen(true)}
      />
      <main className="max-w-5xl w-full mx-auto px-4 pt-5 space-y-4 flex-1 relative z-10">
        <TelegramReminderBar tasks={tasks} lang={lang} />
        <FocusBanner isFocusMode={isFocusMode} onExit={() => setIsFocusMode(false)} lang={lang} />
        <DashboardContent
          isFocusMode={isFocusMode} viewMode={viewMode} tasks={tasks} filteredTasks={filteredTasks}
          selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory}
          horizonStats={horizonStats} timeHorizon={timeHorizon} onSelectHorizon={setTimeHorizon}
          currentSort={currentSort} sortAsc={sortAsc} onSelectSort={setCurrentSort}
          onToggleAsc={() => setSortAsc(!sortAsc)} searchQuery={searchQuery} onSearchChange={setSearchQuery}
          onToggleComplete={toggleTask} onEditTask={(t) => { setEditingTask(t); setIsTaskModalOpen(true); }}
          onDeleteTask={deleteTask} onOpenNewTask={() => { setDefaultDueDate(undefined); setEditingTask(null); setIsTaskModalOpen(true); }}
          onSelectCalendarDate={setSelectedCalendarDate} lang={lang}
        />
      </main>
      <ModalsContainer
        isTaskModalOpen={isTaskModalOpen} editingTask={editingTask} defaultDueDate={defaultDueDate}
        isPasswordModalOpen={isPasswordModalOpen} isStyleModalOpen={isStyleModalOpen}
        selectedCalendarDate={selectedCalendarDate} calendarDateTasks={calendarTasks}
        pageStyleConfig={styleConfig}
        onSaveTask={(d) => { if (editingTask) updateTask(editingTask.id, d); else addTask(d); }}
        onCloseTaskModal={() => { setIsTaskModalOpen(false); setEditingTask(null); setDefaultDueDate(undefined); }}
        onClosePasswordModal={() => setIsPasswordModalOpen(false)}
        onCloseStyleModal={() => setIsStyleModalOpen(false)}
        onCloseCalendarModal={() => setSelectedCalendarDate(null)}
        onToggleTask={toggleTask}
        onEditTask={(t) => { setEditingTask(t); setIsTaskModalOpen(true); }}
        onDeleteTask={deleteTask}
        onAddNewForDate={(d) => { setDefaultDueDate(d); setEditingTask(null); setIsTaskModalOpen(true); }}
        onChangeStyleConfig={setStyleConfig} lang={lang}
      />
    </div>
  );
}
