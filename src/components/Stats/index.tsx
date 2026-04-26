import { useTasksStore } from '../../store/tasks.store';

export default function Stats() {
  const tasks = useTasksStore(state => state.tasks);

  const activeTaksCount = tasks.filter(task => !task.completed).length;
  const completedTaksCount = tasks.filter(task => task.completed).length;
  const totalCountTasks = tasks.length;
  const percentage =
    totalCountTasks === 0 ? 0 : Math.round((completedTaksCount / totalCountTasks) * 100);

  return totalCountTasks === 0 ? (
    <div className="stats">Нет задач</div>
  ) : (
    <div className="stats">
      <svg className="progress-ring" width="120" height="120">
        <circle className="progress-ring__bg" cx="60" cy="60" r="54" />
        <circle
          className="progress-ring__value"
          cx="60"
          cy="60"
          r="54"
          style={{
            strokeDashoffset: `calc(
      var(--circumference) - (var(--circumference) * ${percentage / 100})`,
          }}
        />
        <text className="progress-ring__text" x="50%" y="50%" transform="rotate(90, 60, 60)">
          {percentage}%
        </text>
      </svg>
      <div className="stats__info">
        <p>
          Дел Запланировано: <span>{activeTaksCount}</span>
        </p>
        <p>
          Дел Завершено: <span>{completedTaksCount}</span>
        </p>
      </div>
    </div>
  );
}
