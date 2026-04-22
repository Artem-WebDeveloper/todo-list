import TasksItem from '../TasksItem/TasksItem';

export default function CompletedTasks({
  onTaskList,
  onHandleToggleTask,
  onHandleDeleteTask,
  onHandleEditTask,
}) {
  const numComplete = onTaskList.filter(item => item.completed).length;

  return (
    !!numComplete && (
      <section className="completed-section">
        <h2 className="heading">Выполнено:</h2>
        <ul className="tasks-list">
          {onTaskList.map(task =>
            task.completed ? (
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
