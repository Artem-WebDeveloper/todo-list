import useTasks from '../../hooks/useTasks';
import TasksList from '../TasksList';
import Stats from '../Stats';
import TasksListCompleted from '../TasksListCompleted';
import TaskForm from '../TaskForm';

export default function Main() {
  const { tasks, addTask, handleToggleTask, handleDeleteTask, handleEditTask } = useTasks();

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const totalTasksCount = tasks.length;

  return (
    <main className="container-app">
      <TaskForm onAddTask={addTask} />
      <TasksList
        tasks={activeTasks}
        onHandleToggleTask={handleToggleTask}
        onHandleDeleteTask={handleDeleteTask}
        onHandleEditTask={handleEditTask}
        totalTasksCount={totalTasksCount}
      />
      <TasksListCompleted
        tasks={completedTasks}
        onHandleToggleTask={handleToggleTask}
        onHandleDeleteTask={handleDeleteTask}
        onHandleEditTask={handleEditTask}
      />
      <Stats tasks={tasks} />
    </main>
  );
}
