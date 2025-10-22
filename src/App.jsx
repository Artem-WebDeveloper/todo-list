import { useState } from 'react';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';

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
      {/* <h1 className="title">Simple To Do App</h1> */}
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
        <button className="btn add-form__btn">Добавить</button>
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
        <h2 className="heading text-center">Все дела завершены! 🚀</h2>
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
        ✒️
      </button>
      <button
        className="btn btn--delete"
        onClick={() => onHandleDeleteTask(tasks.id)}>
        ❌
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
          Дел запланировано: <span>{NumUnComplete}</span>
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

export default App;
