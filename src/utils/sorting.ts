import { TaskItem, SortCriteria } from '../types.ts';
import { PASTEL_COLORS } from '../data/colors.ts';

export const sortTasks = (
  tasks: TaskItem[],
  criteria: SortCriteria,
  ascending = true,
): TaskItem[] => {
  const sorted = [...tasks];

  sorted.sort((a, b) => {
    let cmp = 0;

    switch (criteria) {
      case 'color': {
        const orderA = PASTEL_COLORS[a.color]?.order ?? 99;
        const orderB = PASTEL_COLORS[b.color]?.order ?? 99;
        cmp = orderA - orderB;
        break;
      }
      case 'text': {
        const fullTextA = `${a.title} ${a.description}`.toLowerCase();
        const fullTextB = `${b.title} ${b.description}`.toLowerCase();
        cmp = fullTextA.localeCompare(fullTextB);
        break;
      }
      case 'title': {
        cmp = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        break;
      }
      case 'description': {
        cmp = a.description.toLowerCase().localeCompare(b.description.toLowerCase());
        break;
      }
      case 'dueDate': {
        const dateA = a.dueDate || '9999-99-99';
        const dateB = b.dueDate || '9999-99-99';
        cmp = dateA.localeCompare(dateB);
        break;
      }
      default:
        cmp = 0;
    }

    if (cmp === 0) {
      // Secondary sort: keep active tasks above completed, then by creation
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return b.createdAt - a.createdAt;
    }

    return ascending ? cmp : -cmp;
  });

  return sorted;
};
