import { useState } from 'react';

const tasks = [
  {
    task: 'Помыть посуду',
    id: 1,
    completed: false,
  },
  {
    task: 'Погладить кота',
    id: 2,
    completed: true,
  },
  {
    task: 'Пострирать вещи',
    id: 3,
    completed: true,
  },
];

function App() {
  return (
    <>
      <h1 className="title">Simple To Do App</h1>
      <Main />
    </>
  );
}

function Main() {
  const [taskList, setTasksList] = useState(tasks);

  function handleToggleTask(id) {
    setTasksList(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <main className="container-app">
      <Form />
      <TaskList onTaskList={taskList} onHandleToggleTask={handleToggleTask} />
      <CompletedList
        onTaskList={taskList}
        onHandleToggleTask={handleToggleTask}
      />
      <Stats />
    </main>
  );
}

function Form() {
  return (
    <form className="add-form">
      <h2 className="heading">Добавить задачу:</h2>
      <div className="add-form__add-box">
        <input
          className="add-form__input"
          type="text"
          placeholder="Что будете делать?"
        />
        <button className="btn add-form__btn">Добавить</button>
      </div>
    </form>
  );
}

function TaskList({ onTaskList, onHandleToggleTask }) {
  return (
    <section className="todo-section">
      <h2 className="heading">Список дел:</h2>
      <ul className="tasks-list">
        {onTaskList.map(task =>
          !task.completed ? (
            <Item
              tasks={task}
              key={task.id}
              onHandleToggleTask={onHandleToggleTask}
            />
          ) : (
            false
          )
        )}
      </ul>
    </section>
  );
}
function CompletedList({ onTaskList, onHandleToggleTask }) {
  return (
    <section className="completed-section">
      <h2 className="heading">Выполнено:</h2>
      <ul className="tasks-list">
        {onTaskList.map(task =>
          task.completed ? (
            <Item
              tasks={task}
              key={task.id}
              onHandleToggleTask={onHandleToggleTask}
            />
          ) : (
            false
          )
        )}
      </ul>
    </section>
  );
}

function Item({ tasks, onHandleToggleTask }) {
  return (
    // <li className="list-item list-item--edit">
    <li className="list-item">
      <input
        className="list-item__checkbox"
        type="checkbox"
        checked={tasks.completed}
        onChange={() => onHandleToggleTask(tasks.id)}
      />
      <span className="list-item__note">{tasks.task}</span>
      <input className="list-item__input" type="text" />
      <button className="btn btn--edit">✒️</button>
      <button className="btn btn--delete">❌</button>
    </li>
  );
}

function Stats() {
  return (
    <div className="stats">
      <svg class="progress-ring" width="120" height="120">
        <circle className="progress-ring__bg" cx="60" cy="60" r="54" />
        <circle className="progress-ring__value" cx="60" cy="60" r="54" />
        <text
          className="progress-ring__text"
          class="progress-ring__text"
          x="50%"
          y="50%"
          transform="rotate(90, 60, 60)">
          65%
        </text>
      </svg>
      <div className="stats__info">
        <p>
          Дел запланировано: <span>2</span>
        </p>
        <p>
          Дел Завершено: <span>1</span>
        </p>
      </div>
    </div>
  );
}

export default App;
