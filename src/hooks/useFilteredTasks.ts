import { useMemo } from 'react';
import { TaskItem, TaskCategory, SortCriteria, TimeHorizon } from '../types.ts';
import { matchesTimeHorizon } from '../utils/dates.ts';
import { sortTasks } from '../utils/sorting.ts';

interface FilterParams {
  tasks: TaskItem[];
  selectedCategory: TaskCategory | 'all';
  timeHorizon: TimeHorizon;
  searchQuery: string;
  currentSort: SortCriteria;
  sortAsc: boolean;
}

export function useFilteredTasks({
  tasks,
  selectedCategory,
  timeHorizon,
  searchQuery,
  currentSort,
  sortAsc,
}: FilterParams) {
  const horizonStats = useMemo(() => {
    const list = tasks.filter((t) => matchesTimeHorizon(t.dueDate, t.completed, timeHorizon));
    return { done: list.filter((t) => t.completed).length, total: list.length };
  }, [tasks, timeHorizon]);

  const filteredTasks = useMemo(() => {
    let list = tasks;
    if (selectedCategory !== 'all') list = list.filter((t) => t.category === selectedCategory);
    if (timeHorizon !== 'all') list = list.filter((t) => matchesTimeHorizon(t.dueDate, t.completed, timeHorizon));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    return sortTasks(list, currentSort, sortAsc);
  }, [tasks, selectedCategory, timeHorizon, searchQuery, currentSort, sortAsc]);

  return { filteredTasks, horizonStats };
}
