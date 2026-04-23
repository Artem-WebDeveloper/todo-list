export interface TaskType {
  id: string;
  task: string;
  completed: boolean;
}

export interface TasksListProps {
  tasks: TaskType[];
  onHandleToggleTask: (id: string) => void;
  onHandleDeleteTask: (id: string) => void;
  onHandleEditTask: (id: string, newTask: string) => void;
}

export interface TasksListCompletedProps extends TasksListProps {
  totalTasksCount: number;
}
