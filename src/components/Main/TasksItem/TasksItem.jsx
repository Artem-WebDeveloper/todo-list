import { useState } from 'react';
import { Pencil, Trash2, CircleCheckBig } from 'lucide-react';

export default function TasksItem({
  tasks,
  onHandleToggleTask,
  onHandleDeleteTask,
  onHandleEditTask,
}) {
  const [newTask, setnewTask] = useState(tasks.task);
  const [editMode, setEditMode] = useState(false);

  function handleToggleEditMode() {
    setEditMode(is => !is);
  }

  return (
    <li className={`list-item ${editMode ? 'list-item--edit' : ''}`}>
      <input
        className="list-item__checkbox"
        type="checkbox"
        checked={tasks.completed}
        onChange={() => onHandleToggleTask(tasks.id)}
      />
      <span className="list-item__note">{tasks.task}</span>
      <input
        className="list-item__input"
        type="text"
        value={newTask}
        onChange={e => setnewTask(e.target.value)}
      />
      <button
        className="btn btn--edit"
        onClick={() => {
          handleToggleEditMode();
          editMode ? onHandleEditTask(tasks.id, newTask) : false;
        }}>
        <Pencil size={20} />
      </button>
      <button className="btn btn--delete" onClick={() => onHandleDeleteTask(tasks.id)}>
        <Trash2 size={20} />
      </button>
    </li>
  );
}
