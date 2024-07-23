type Task = {
  _id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  createdAt: string;
};

type Column = {
  columnId: string;
  name: "TODO" | "IN_PROGRESS" | "DONE";
  taskOrderId: string;
  tasks: Task[];
};

type Board = {
  boardId: string;
  name: string;
  description: string;
  columns: Column[];
  createdAt: string;
};

export type { Board, Column, Task };
