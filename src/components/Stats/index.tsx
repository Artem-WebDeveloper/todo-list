import { useAppSelector } from '../../store/store';
import {
  selectCountActiveTasks,
  selectCountCompletedTasks,
  selectPercentage,
  selectTotalTasksCount,
} from '../../store/tasks.selectors';

export default function Stats() {
  const totalCount = useAppSelector(selectTotalTasksCount);
  const activeCount = useAppSelector(selectCountActiveTasks);
  const completedCount = useAppSelector(selectCountCompletedTasks);
  const percentage = useAppSelector(selectPercentage);

  return totalCount === 0 ? (
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
          Дел Запланировано: <span>{activeCount}</span>
        </p>
        <p>
          Дел Завершено: <span>{completedCount}</span>
        </p>
      </div>
    </div>
  );
}
