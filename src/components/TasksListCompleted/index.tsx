import useTasks from '../../contexts/tasksContext/useTasks';
import TasksItem from '../TasksItem';

export default function TasksListCompleted() {
  const { completedTasks } = useTasks();

  if (!completedTasks.length) return null;

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
