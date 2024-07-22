import { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import TaskContainer from "./TaskContainer";
import TaskCard from "./TaskCard";
import { createPortal } from "react-dom";
import TaskForm from "./TaskForm";
import apiClient from "../axios/apiClient";
import { Board } from "../types";
import { useParams } from "react-router-dom";

const initialBoard: Board = {
  boardId: "",
  name: "",
  description: "",
  columns: [
    {
      columnId: "a",
      name: "TODO",
      taskOrderId: "x",
      tasks: [],
    },
    {
      columnId: "b",
      name: "IN_PROGRESS",
      taskOrderId: "y",
      tasks: [],
    },
    {
      columnId: "c",
      name: "DONE",
      taskOrderId: "z",
      tasks: [],
    },
  ],
  createdAt: "",
};

const KanbanBoard = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState<Board>(initialBoard);
  const [show, setShow] = useState(false);

  const todoColumn = board.columns.filter(
    (eachColumn) => eachColumn.name === "TODO",
  );

  const getTaskById = useCallback(async () => {
    const result = await apiClient.get(`/board/${boardId}`);
    return result;
  }, [boardId]);

  useEffect(() => {
    getTaskById().then((res) => setBoard(res.data));
  }, [getTaskById]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Moved to a different column
    const sourceColumn = board.columns.find(
      (col) => col.name === source.droppableId,
    );
    const destColumn = board.columns.find(
      (col) => col.name === destination.droppableId,
    );

    if (sourceColumn && destColumn) {
      const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

      movedTask.status = destination.droppableId;

      destColumn.tasks.splice(destination.index, 0, movedTask);

      const updatedColumns = board.columns.map((col) => {
        if (col.name === source.droppableId) {
          return { ...sourceColumn }; // Return the updated source column
        } else if (col.name === destination.droppableId) {
          return { ...destColumn }; // Return the updated destination column
        }
        return col; // Return other columns unchanged
      });

      setBoard({
        ...board,
        columns: updatedColumns,
      });
    }
  };

  return (
    <div className="mt-5 space-y-5">
      <button
        onClick={() => setShow(true)}
        className="font-medium px-5 py-1.5 ml-2 rounded-md text-white bg-blue-500 sm:ml-4"
      >
        Add Task
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="p-2 flex flex-col  space-y-5 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start sm:mt-10 sm:space-x-10 sm:px-4">
          {board.columns.map(({ columnId, tasks, name }) => (
            <Droppable key={columnId} droppableId={name}>
              {(provided) => (
                <TaskContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  status={name}
                >
                  {tasks.map(
                    ({ _id, createdAt, description, title }, index) => (
                      <Draggable key={_id} draggableId={_id} index={index}>
                        {(provided) => (
                          <TaskCard
                            title={title}
                            description={description}
                            createdAt={createdAt}
                            _id={_id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          />
                        )}
                      </Draggable>
                    ),
                  )}
                  {provided.placeholder}
                </TaskContainer>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {show &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 p-3">
            <TaskForm closeDialog={setShow} columnId={todoColumn[0].columnId} />
          </div>,
          document.body,
        )}
    </div>
  );
};

export default KanbanBoard;
