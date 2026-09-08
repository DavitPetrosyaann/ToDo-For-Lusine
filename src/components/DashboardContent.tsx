import { TaskItem, TaskCategory, SortCriteria, TimeHorizon, Language } from '../types.ts';
import { DashboardStats } from './DashboardStats.tsx';
import { TimelineFilter } from './TimelineFilter.tsx';
import { SortBar } from './SortBar.tsx';
import { TaskList } from './TaskList.tsx';
import { CalendarView } from './CalendarView.tsx';

interface DashboardContentProps {
  isFocusMode: boolean;
  viewMode: 'list' | 'calendar';
  tasks: TaskItem[];
  filteredTasks: TaskItem[];
  selectedCategory: TaskCategory | 'all';
  onSelectCategory: (cat: TaskCategory | 'all') => void;
  horizonStats: { done: number; total: number };
  timeHorizon: TimeHorizon;
  onSelectHorizon: (h: TimeHorizon) => void;
  currentSort: SortCriteria;
  sortAsc: boolean;
  onSelectSort: (s: SortCriteria) => void;
  onToggleAsc: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleComplete: (id: string) => void;
  onEditTask: (t: TaskItem) => void;
  onDeleteTask: (id: string) => void;
  onOpenNewTask: () => void;
  onSelectCalendarDate: (dateStr: string) => void;
  lang: Language;
}

export function DashboardContent(props: DashboardContentProps) {
  const {
    isFocusMode, viewMode, tasks, filteredTasks, selectedCategory, onSelectCategory,
    horizonStats, timeHorizon, onSelectHorizon, currentSort, sortAsc, onSelectSort,
    onToggleAsc, searchQuery, onSearchChange, onToggleComplete, onEditTask,
    onDeleteTask, onOpenNewTask, onSelectCalendarDate, lang,
  } = props;

  if (isFocusMode) {
    return (
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={onToggleComplete}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
        onOpenNewTask={onOpenNewTask}
        lang={lang}
      />
    );
  }

  if (viewMode === 'calendar') {
    return <CalendarView tasks={tasks} lang={lang} onSelectDate={onSelectCalendarDate} />;
  }

  return (
    <>
      <DashboardStats
        tasks={tasks}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        horizonStats={horizonStats}
        timeHorizon={timeHorizon}
        lang={lang}
      />
      <TimelineFilter currentHorizon={timeHorizon} onSelectHorizon={onSelectHorizon} tasks={tasks} lang={lang} />
      <SortBar
        currentSort={currentSort}
        sortAsc={sortAsc}
        onSelectSort={onSelectSort}
        onToggleAsc={onToggleAsc}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        lang={lang}
      />
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={onToggleComplete}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
        onOpenNewTask={onOpenNewTask}
        lang={lang}
      />
    </>
  );
}
