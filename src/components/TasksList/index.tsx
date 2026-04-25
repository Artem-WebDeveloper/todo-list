import { CircleCheckBig } from 'lucide-react';

import TasksItem from '../TasksItem';
import { useAppSelector } from '../../store/store';
import { selectActiveTasks, selectTotalTasksCount } from '../../store/tasks.selectors';

const COLOR_SUCCESS = '#51ce55';

export default function TasksList() {
  const tasks = useAppSelector(selectActiveTasks);
  const totalCount = useAppSelector(selectTotalTasksCount);

  if (tasks.length === 0 && totalCount !== 0)
    return (
      <section className="todo-section">
        <h2 className="heading text-center">
          Все дела завершены! <CircleCheckBig color={COLOR_SUCCESS} />
        </h2>
      </section>
    );

  if (tasks.length === 0) return null;

  return (
    <section className="todo-section">
      <h2 className="heading">Список дел:</h2>
      <ul className="tasks-list">
        {tasks.map(task => (
          <TasksItem task={task} key={task.id} />
        ))}
      </ul>
    </section>
  );
}
