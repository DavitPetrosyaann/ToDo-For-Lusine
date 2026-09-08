import { TaskItem, TaskCategory, TimeHorizon, Language } from '../types.ts';
import { ProgressBar } from './ProgressBar.tsx';
import { CategoryStats } from './CategoryStats.tsx';
import { FitnessStatsCard } from './FitnessStatsCard.tsx';

interface DashboardStatsProps {
  tasks: TaskItem[];
  selectedCategory: TaskCategory | 'all';
  onSelectCategory: (cat: TaskCategory | 'all') => void;
  horizonStats: { done: number; total: number };
  timeHorizon: TimeHorizon;
  lang: Language;
}

export function DashboardStats({
  tasks,
  selectedCategory,
  onSelectCategory,
  horizonStats,
  timeHorizon,
  lang,
}: DashboardStatsProps) {
  return (
    <div className="space-y-4">
      <ProgressBar
        completedCount={horizonStats.done}
        totalCount={horizonStats.total}
        horizon={timeHorizon}
        lang={lang}
      />
      <CategoryStats
        tasks={tasks}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        lang={lang}
      />
      <FitnessStatsCard
        tasks={tasks}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        lang={lang}
      />
    </div>
  );
}
