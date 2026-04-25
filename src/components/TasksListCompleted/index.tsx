import { useAppSelector } from '../../store/store';
import { selectCompletedTasks } from '../../store/tasks.selectors';
import TasksItem from '../TasksItem';

export default function TasksListCompleted() {
  const tasks = useAppSelector(selectCompletedTasks);

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
