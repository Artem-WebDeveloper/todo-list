function App() {
  return (
    <>
      <h1 className="title">Simple To Do App</h1>
      <div className="container">
        <Form />
        <TaskList />
        <CompletedList />
        <Stats />
      </div>
    </>
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

function TaskList() {
  return (
    <section className="todo-section">
      <h2 className="heading">Список дел:</h2>
      <ul className="tasks-list">
        <Item />
      </ul>
    </section>
  );
}
function CompletedList() {
  return (
    <section className="completed-section">
      <h2 className="heading">Выполнено:</h2>
      <ul className="tasks-list">
        <Item />
        <Item />
        <Item />
      </ul>
    </section>
  );
}

function Item() {
  return (
    // <li className="list-item list-item--edit">
    <li className="list-item">
      <input className="list-item__checkbox" type="checkbox" />
      <span className="list-item__note">Помыть посуду</span>
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
