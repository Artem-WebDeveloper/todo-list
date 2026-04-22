import { useState, useEffect } from 'react';
import Form from './Form/Form';
import TasksList from './TasksList/TasksList';
import CompletedTasks from './CompletedTasks/CompletedTasks';
import Stats from './Stats/Stats';

export default function Main() {
  const [taskList, setTasksList] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  function AddTask(item) {
    setTasksList(items => [...items, item]);
  }

  function handleToggleTask(id) {
    setTasksList(items =>
      items.map(item => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }

  function handleDeleteTask(id) {
    setTasksList(items => items.filter(item => item.id !== id));
  }

  function handleEditTask(id, newTask) {
    setTasksList(items => items.map(item => (item.id === id ? { ...item, task: newTask } : item)));
  }

  return (
    <main className="container-app">
      <Form onAddTask={AddTask} />
      <TasksList
        onTaskList={taskList}
        onHandleToggleTask={handleToggleTask}
        onHandleDeleteTask={handleDeleteTask}
        onHandleEditTask={handleEditTask}
      />
      <CompletedTasks
        onTaskList={taskList}
        onHandleToggleTask={handleToggleTask}
        onHandleDeleteTask={handleDeleteTask}
        onHandleEditTask={handleEditTask}
      />
      <Stats onTaskList={taskList} />
    </main>
  );
}
