import { CircleCheckBig } from 'lucide-react';

import TasksItem from '../TasksItem/TasksItem';

export default function TasksList({
  onTaskList,
  onHandleToggleTask,
  onHandleDeleteTask,
  onHandleEditTask,
}) {
  const NumUnComplete = onTaskList.filter(item => !item.completed).length;

  if (NumUnComplete === 0 && onTaskList.length !== 0)
    return (
      <section className="todo-section">
        <h2 className="heading text-center">
          Все дела завершены! <CircleCheckBig color={'#51ce55'} />
        </h2>
      </section>
    );

  return (
    !!NumUnComplete && (
      <section className="todo-section">
        <h2 className="heading">Список дел:</h2>
        <ul className="tasks-list">
          {onTaskList.map(task =>
            !task.completed ? (
              <TasksItem
                tasks={task}
                key={task.id}
                onHandleToggleTask={onHandleToggleTask}
                onHandleDeleteTask={onHandleDeleteTask}
                onHandleEditTask={onHandleEditTask}
              />
            ) : (
              false
            ),
          )}
        </ul>
      </section>
    )
  );
}
