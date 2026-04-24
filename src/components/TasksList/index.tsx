import { CircleCheckBig } from 'lucide-react';
import type { TasksListCompletedProps } from '../../types';

import TasksItem from '../TasksItem';

const COLOR_SUCCESS = '#51ce55';

export default function TasksList({
  tasks,
  onHandleToggleTask,
  onHandleDeleteTask,
  onHandleEditTask,
  totalTasksCount,
}: TasksListCompletedProps) {
  if (tasks.length === 0 && totalTasksCount !== 0)
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
          <TasksItem
            task={task}
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
