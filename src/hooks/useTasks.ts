import { useEffect, useState } from 'react';
import type { TaskType } from '../types';

function getInitialTasks() {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
}

function useTasks() {
  const [tasks, setTasksList] = useState<TaskType[]>(getInitialTasks);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(item: TaskType) {
    setTasksList(items => [...items, item]);
  }

  function handleToggleTask(id: string) {
    setTasksList(items =>
      items.map(item => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }

  function handleDeleteTask(id: string) {
    setTasksList(items => items.filter(item => item.id !== id));
  }

  function handleEditTask(id: string, newTask: string) {
    setTasksList(items => items.map(item => (item.id === id ? { ...item, task: newTask } : item)));
  }

  return { tasks, addTask, handleToggleTask, handleDeleteTask, handleEditTask };
}

export default useTasks;
