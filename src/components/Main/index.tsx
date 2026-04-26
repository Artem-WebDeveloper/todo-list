import TasksList from '../TasksList';
import Stats from '../Stats';
import TasksListCompleted from '../TasksListCompleted';
import TaskForm from '../TaskForm';

export default function Main() {
  return (
    <main className="container-app">
      <TaskForm />
      <TasksList />
      <TasksListCompleted />
      <Stats />
    </main>
  );
}
