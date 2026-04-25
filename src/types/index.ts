export interface TaskType {
  id: string;
  task: string;
  completed: boolean;
}

export interface TasksState {
  tasks: TaskType[];
}
