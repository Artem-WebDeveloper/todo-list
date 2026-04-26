import { useState } from 'react';
import { nanoid } from 'nanoid';

import PlusIcon from '../../assets/svg/PlusIcon';
import { useTasksStore } from '../../store/tasks.store';

export default function TaskForm() {
  const [descrip, setDescrip] = useState('');

  const addTask = useTasksStore(state => state.add);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!descrip) return;

    const newTask = {
      task: descrip.trim(),
      id: nanoid(),
      completed: false,
    };

    addTask(newTask);
    setDescrip('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2 className="heading">Добавить задачу:</h2>
      <div className="add-form__add-box">
        <input
          className="add-form__input"
          type="text"
          placeholder="Что будете делать?"
          value={descrip}
          onChange={e => setDescrip(e.target.value)}
        />
        <button className="add-form__btn">
          <PlusIcon />
        </button>
      </div>
    </form>
  );
}
