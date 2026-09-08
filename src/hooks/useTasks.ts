import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TaskItem, TaskCategory, PastelColor } from '../types.ts';
import { loadTasksFromStorage, saveTasksToStorage } from '../utils/storage.ts';

export function useTasks() {
  const [tasks, setTasks] = useState<TaskItem[]>(() => loadTasksFromStorage());

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextCompleted = !t.completed;
        if (nextCompleted) {
          confetti({
            particleCount: 25,
            spread: 45,
            origin: { y: 0.7 },
            colors: ['#86efac', '#f9a8d4', '#fde047', '#bae6fd'],
          });
        }
        return {
          ...t,
          completed: nextCompleted,
          completedAt: nextCompleted ? Date.now() : undefined,
        };
      }),
    );
  };

  const addTask = (data: {
    title: string;
    description: string;
    category: TaskCategory;
    color: PastelColor;
    dueDate: string;
  }) => {
    const newTask: TaskItem = {
      id: 'task-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      ...data,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (
    id: string,
    data: Partial<Omit<TaskItem, 'id' | 'createdAt'>>,
  ) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const totalCompleted = tasks.filter((t) => t.completed).length;

  return {
    tasks,
    totalCompleted,
    toggleTask,
    addTask,
    updateTask,
    deleteTask,
  };
}
