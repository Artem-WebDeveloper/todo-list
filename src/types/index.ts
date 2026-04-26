export interface TaskType {
  id: string;
  task: string;
  completed: boolean;
}

interface TasksProps {
  onHandleToggleTask: (id: string) => void;
  onHandleDeleteTask: (id: string) => void;
  onHandleEditTask: (id: string, newTask: string) => void;
}

export interface TasksItemProps extends TasksProps {
  task: TaskType;
}

export interface TasksListProps extends TasksProps {
  tasks: TaskType[];
}

export interface TasksListCompletedProps extends TasksListProps {
  totalTasksCount: number;
}
