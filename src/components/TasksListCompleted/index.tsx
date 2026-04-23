import type { TasksListProps } from '../../types';
import TasksItem from '../TasksItem';

export default function TasksListCompleted({
  tasks,
  onHandleToggleTask,
  onHandleDeleteTask,
  onHandleEditTask,
}: TasksListProps) {
  if (!tasks.length) return null;

  return (
    <section className="completed-section">
      <h2 className="heading">Выполнено:</h2>
      <ul className="tasks-list">
        {tasks.map(task => (
          <TasksItem
            tasks={task}
            key={task.id}
            onHandleToggleTask={onHandleToggleTask}
            onHandleDeleteTask={onHandleDeleteTask}
            onHandleEditTask={onHandleEditTask}
          />
        ))}
      </ul>
    </section>
  );
}
