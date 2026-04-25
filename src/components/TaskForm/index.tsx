import { useState } from 'react';
import { nanoid } from 'nanoid';

import PlusIcon from '../../assets/svg/PlusIcon';
import useTasks from '../../contexts/tasksContext/useTasks';

export default function TaskForm() {
  const { addTask } = useTasks();

  const [descrip, setDescrip] = useState('');

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
