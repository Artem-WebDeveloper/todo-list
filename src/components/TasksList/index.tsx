import { CircleCheckBig } from 'lucide-react';
import TasksItem from '../TasksItem';
import { useTasksStore } from '../../store/tasks.store';

const COLOR_SUCCESS = '#51ce55';

export default function TasksList() {
  const tasks = useTasksStore(state => state.tasks);
  const totalTasksCount = tasks.length;
  const activeTasks = tasks.filter(task => !task.completed);

  if (activeTasks.length === 0 && totalTasksCount !== 0)
    return (
      <section className="todo-section">
        <h2 className="heading text-center">
          Все дела завершены! <CircleCheckBig color={COLOR_SUCCESS} />
        </h2>
      </section>
    );

  if (activeTasks.length === 0) return null;

  return (
    <section className="todo-section">
      <h2 className="heading">Список дел:</h2>
      <ul className="tasks-list">
        {activeTasks.map(task => (
          <TasksItem task={task} key={task.id} />
        ))}
      </ul>
    </section>
  );
}
