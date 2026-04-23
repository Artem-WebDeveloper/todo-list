import type { TaskType } from '../../types';

export default function Stats({ tasks }: { tasks: TaskType[] }) {
  const numAll = tasks.length;
  const numComplete = tasks.filter(item => item.completed).length;
  const NumUnComplete = tasks.filter(item => !item.completed).length;
  const percentage = Math.round((numComplete / numAll) * 100);

  return numAll === 0 ? (
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
          Дел Запланировано: <span>{NumUnComplete}</span>
        </p>
        <p>
          Дел Завершено: <span>{numComplete}</span>
        </p>
      </div>
    </div>
  );
}
