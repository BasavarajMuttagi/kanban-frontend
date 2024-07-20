type Task = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: number;
  status: "TODO" | "IN_PROGRESS" | "DONE";
};

type TaskBoard = {
  TODO: Task[];
  IN_PROGRESS: Task[];
  DONE: Task[];
};

export type { Task, TaskBoard };
