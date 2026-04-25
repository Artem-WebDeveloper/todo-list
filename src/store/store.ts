import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasks.slice';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: { tasks: tasksReducer },
});

store.subscribe(() => {
  localStorage.setItem('tasks', JSON.stringify(store.getState().tasks.tasks));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
