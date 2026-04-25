import { useEffect, useState } from 'react';
import type { TaskType } from '../types';

function getInitialTasks() {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
}

function useTasks() {
  const [tasks, setTasks] = useState<TaskType[]>(getInitialTasks);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(item: TaskType) {
    setTasks(items => [...items, item]);
  }

  function handleToggleTask(id: string) {
    setTasks(items =>
      items.map(item => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }

  function handleDeleteTask(id: string) {
    setTasks(items => items.filter(item => item.id !== id));
  }

  function handleEditTask(id: string, newTask: string) {
    setTasks(items => items.map(item => (item.id === id ? { ...item, task: newTask } : item)));
  }

  return { tasks, addTask, handleToggleTask, handleDeleteTask, handleEditTask };
}

export default useTasks;
