import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { TasksItemProps } from '../../types';

export default function TasksItem({
  task,
  onHandleToggleTask,
  onHandleDeleteTask,
  onHandleEditTask,
}: TasksItemProps) {
  const [taskValue, setTaskValue] = useState<string>(task.task);
  const [editMode, setEditMode] = useState(false);

  function handleToggleEditMode() {
    setEditMode(is => !is);
    if (editMode && taskValue !== task.task) {
      onHandleEditTask(task.id, taskValue);
    }
  }

  return (
    <li className={`list-item ${editMode ? 'list-item--edit' : ''}`}>
      <input
        className="list-item__checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onHandleToggleTask(task.id)}
      />
      <span className="list-item__note">{task.task}</span>
      <input
        className="list-item__input"
        type="text"
        value={taskValue}
        onChange={e => setTaskValue(e.target.value)}
      />
      <button className="btn btn--edit" onClick={handleToggleEditMode}>
        <Pencil size={20} />
      </button>
      <button className="btn btn--delete" onClick={() => onHandleDeleteTask(task.id)}>
        <Trash2 size={20} />
      </button>
    </li>
  );
}
