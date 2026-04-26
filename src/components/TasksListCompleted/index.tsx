import { useTasksStore } from '../../store/tasks.store';

import TasksItem from '../TasksItem';

export default function TasksListCompleted() {
  const tasks = useTasksStore(state => state.tasks);
  const completedTasks = tasks.filter(task => task.completed);

  if (!tasks.length) return null;

  return (
    <section className="completed-section">
      <h2 className="heading">Выполнено:</h2>
      <ul className="tasks-list">
        {completedTasks.map(task => (
          <TasksItem task={task} key={task.id} />
        ))}
      </ul>
    </section>
  );
}
