import { selectCompletedTasks } from '../../store/tasks.selectors';
import { useTasksStore } from '../../store/tasks.store';

import TasksItem from '../TasksItem';

export default function TasksListCompleted() {
  const tasks = useTasksStore(selectCompletedTasks);

  if (!tasks.length) return null;

  return (
    <section className="completed-section">
      <h2 className="heading">Выполнено:</h2>
      <ul className="tasks-list">
        {tasks.map(task => (
          <TasksItem task={task} key={task.id} />
        ))}
      </ul>
    </section>
  );
}
