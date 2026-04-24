import { createContext, useEffect, useReducer } from 'react';
import type { TaskType } from '../../types';
import type { ContextTasksType, TasksAction, TasksState } from './types';

const TasksContext = createContext<ContextTasksType | null>(null);

const initialState: TasksState = {
  tasks: [],
};

function reducer(state: TasksState, action: TasksAction) {
  switch (action.type) {
    case 'tasks/add': {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }

    case 'tasks/delete': {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    }

    case 'tasks/edit': {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, task: action.payload.newTask } : task,
        ),
      };
    }

    case 'tasks/toggle': {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task,
        ),
      };
    }

    default: {
      throw new Error('Unknown Action');
    }
  }
}

function getInitialTasks() {
  try {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialState;
  } catch {
    return initialState;
  }
}

function TasksProvider({ children }: { children: React.ReactNode }) {
  const [{ tasks }, dispatch] = useReducer(reducer, null, getInitialTasks);

  useEffect(
    function () {
      localStorage.setItem('tasks', JSON.stringify({ tasks }));
    },
    [tasks],
  );

  function addTask(newTask: TaskType) {
    dispatch({ type: 'tasks/add', payload: newTask });
  }

  function deleteTask(id: string) {
    dispatch({ type: 'tasks/delete', payload: id });
  }

  function editTask(id: string, newTask: string) {
    dispatch({ type: 'tasks/edit', payload: { id, newTask } });
  }

  function toggleCompletedTask(id: string) {
    dispatch({ type: 'tasks/toggle', payload: id });
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, editTask, toggleCompletedTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider, TasksContext };
