import { useState } from 'react';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Pencil, Trash2, CircleCheckBig } from 'lucide-react';

function App() {
  return (
    <>
      <header className="header">
        <h1 className="title">
          <span>Simple To Do App </span>
        </h1>
        <LogoIcon />
      </header>
      <Main />
    </>
  );
}

function Main() {
  const [taskList, setTasksList] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  function AddTask(item) {
    setTasksList(items => [...items, item]);
  }

  function handleToggleTask(id) {
    setTasksList(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleDeleteTask(id) {
    setTasksList(items => items.filter(item => item.id !== id));
  }

  function handleEditTask(id, newTask) {
    setTasksList(items =>
      items.map(item => (item.id === id ? { ...item, task: newTask } : item))
    );
  }

  return (
    <main className="container-app">
      <Form onAddTask={AddTask} />
      <TaskList
        onTaskList={taskList}
        onHandleToggleTask={handleToggleTask}
        onHandleDeleteTask={handleDeleteTask}
        onHandleEditTask={handleEditTask}
      />
      <CompletedList
        onTaskList={taskList}
        onHandleToggleTask={handleToggleTask}
        onHandleDeleteTask={handleDeleteTask}
        onHandleEditTask={handleEditTask}
      />
      <Stats onTaskList={taskList} />
    </main>
  );
}

function Form({ onAddTask }) {
  const [descrip, setDescrip] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!descrip) return;

    const newTask = {
      task: descrip.trim(),
      id: nanoid(),
      completed: false,
    };
    onAddTask(newTask);
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

function TaskList({
  onTaskList,
  onHandleToggleTask,
  onHandleDeleteTask,
  onHandleEditTask,
}) {
  const NumUnComplete = onTaskList.filter(item => !item.completed).length;

  if (NumUnComplete === 0 && onTaskList.length !== 0)
    return (
      <section className="todo-section">
        <h2 className="heading text-center">
          Все дела завершены! <CircleCheckBig color={'#51ce55'} />
        </h2>
      </section>
    );

  return (
    !!NumUnComplete && (
      <section className="todo-section">
        <h2 className="heading">Список дел:</h2>
        <ul className="tasks-list">
          {onTaskList.map(task =>
            !task.completed ? (
              <Item
                tasks={task}
                key={task.id}
                onHandleToggleTask={onHandleToggleTask}
                onHandleDeleteTask={onHandleDeleteTask}
                onHandleEditTask={onHandleEditTask}
              />
            ) : (
              false
            )
          )}
        </ul>
      </section>
    )
  );
}
function CompletedList({
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
              <Item
                tasks={task}
                key={task.id}
                onHandleToggleTask={onHandleToggleTask}
                onHandleDeleteTask={onHandleDeleteTask}
                onHandleEditTask={onHandleEditTask}
              />
            ) : (
              false
            )
          )}
        </ul>
      </section>
    )
  );
}

function Item({
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
      <button
        className="btn btn--delete"
        onClick={() => onHandleDeleteTask(tasks.id)}>
        <Trash2 size={20} />
      </button>
    </li>
  );
}

function Stats({ onTaskList }) {
  const numAll = onTaskList.length;
  const numComplete = onTaskList.filter(item => item.completed).length;
  const NumUnComplete = onTaskList.filter(item => !item.completed).length;
  const percentage = Math.round((numComplete / numAll) * 100);

  return numAll === 0 ? (
    <div className="stats">Нет задач</div>
  ) : (
    <div className="stats">
      <svg class="progress-ring" width="120" height="120">
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
        <text
          className="progress-ring__text"
          class="progress-ring__text"
          x="50%"
          y="50%"
          transform="rotate(90, 60, 60)">
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

function LogoIcon() {
  return (
    <svg
      className="logo-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none">
      <rect width="24" height="24" />
      <path
        d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7"
        stroke="#ffffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="plus-icon" viewBox="0 0 24 24" fill="#8d5cc1ff">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H13V4Z"
        fill="#8d5cc1ff"
      />
    </svg>
  );
}

export default App;
