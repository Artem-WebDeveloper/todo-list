import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { TaskType } from '../../types';
import { useTasksStore } from '../../store/tasks.store';

export default function TasksItem({ task }: { task: TaskType }) {
  const [taskValue, setTaskValue] = useState<string>(task.task);
  const [editMode, setEditMode] = useState(false);

  const editTask = useTasksStore(state => state.edit);
  const deleteTask = useTasksStore(state => state.remove);
  const toggleCompleted = useTasksStore(state => state.toggleCompleted);

  function handleToggleEditMode() {
    setEditMode(is => !is);
    if (editMode && taskValue !== task.task) {
      editTask(task.id, taskValue);
    }
  }

  return (
    <li className={`list-item ${editMode ? 'list-item--edit' : ''}`}>
      <input
        className="list-item__checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompleted(task.id)}
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
      <button className="btn btn--delete" onClick={() => deleteTask(task.id)}>
        <Trash2 size={20} />
      </button>
    </li>
  );
}
