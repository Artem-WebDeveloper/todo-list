import Main from './components/Main';
import Header from './components/Header/Header';
import { TasksProvider } from './contexts/tasksContext/TasksProvider';

function App() {
  return (
    <>
      <Header />
      <TasksProvider>
        <Main />
      </TasksProvider>
    </>
  );
}

export default App;
