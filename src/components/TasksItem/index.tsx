import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { TaskType } from '../../types';
import { useDispatch } from 'react-redux';
import { edit, remove, toggleCompleted } from '../../store/tasks.slice';

export default function TasksItem({ task }: { task: TaskType }) {
  const dispatch = useDispatch();

  const [taskValue, setTaskValue] = useState<string>(task.task);
  const [editMode, setEditMode] = useState(false);

  function handleToggleEditMode() {
    setEditMode(is => !is);
    if (editMode && taskValue !== task.task) {
      dispatch(edit({ id: task.id, taskValue }));
    }
  }

  return (
    <li className={`list-item ${editMode ? 'list-item--edit' : ''}`}>
      <input
        className="list-item__checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleCompleted(task.id))}
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
      <button className="btn btn--delete" onClick={() => dispatch(remove(task.id))}>
        <Trash2 size={20} />
      </button>
    </li>
  );
}
