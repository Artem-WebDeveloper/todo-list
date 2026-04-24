import { useContext } from 'react';
import { TasksContext } from './TasksProvider';

function useTasks() {
  const context = useContext(TasksContext);

  if (!context) throw new Error('useTasks must be used inside ThemeProvider');
  return context;
}

export default useTasks;
