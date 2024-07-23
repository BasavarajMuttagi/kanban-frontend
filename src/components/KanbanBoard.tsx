import { createContext, useCallback, useEffect, useState } from "react";
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
type RefetchFunction = () => void;
export const RefetchContext = createContext<RefetchFunction>(() => {});
const KanbanBoard = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState<Board>(initialBoard);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const todoColumn = board.columns.filter(
    (eachColumn) => eachColumn.name === "TODO",
  );

  const handleRefetch = async () => {
    getTaskById().then((res) => setBoard(res.data));
  };
  const getTaskById = useCallback(async () => {
    const result = await apiClient.get(`/board/${boardId}`);
    return result;
  }, [boardId]);

  useEffect(() => {
    getTaskById().then((res) => setBoard(res.data));
  }, [getTaskById]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      console.log("no change");
      return;
    }

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      console.log("same position");
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

      movedTask.status = destination.droppableId as
        | "TODO"
        | "IN_PROGRESS"
        | "DONE";

      destColumn.tasks.splice(destination.index, 0, movedTask);

      const updatedColumns = board.columns.map((col) => {
        if (col.name === source.droppableId) {
          return { ...sourceColumn }; // Return the updated source column
        } else if (col.name === destination.droppableId) {
          return { ...destColumn }; // Return the updated destination column
        }
        return col; // Return other columns unchanged
      });

      if (sourceColumn.columnId === destColumn.columnId) {
        console.log("sort in same col", updatedColumns);
        //update only one tasks order in DB
        await updateOrder(
          sourceColumn.taskOrderId,
          sourceColumn.tasks.map((eachItem) => eachItem._id),
        );
      } else {
        console.log("moved to different col");
        //update source tasks order &  destination task status and tasks order
        await updateSND(
          destColumn.name,
          movedTask._id,
          sourceColumn.taskOrderId,
          destColumn.taskOrderId,
          sourceColumn.tasks.map((eachItem) => eachItem._id),
          destColumn.tasks.map((eachItem) => eachItem._id),
        );
      }

      setBoard({
        ...board,
        columns: updatedColumns,
      });
    }
  };

  const updateOrder = async (taskOrderId: string, tasks: string[]) => {
    try {
      setIsLoading(true);
      await apiClient.post("/board/task/update/order", { taskOrderId, tasks });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSND = async (
    status: string,
    taskId: string,
    sourceTaskOrderId: string,
    destinationTaskOrderId: string,
    sourceTasks: string[],
    destinationTasks: string[],
  ) => {
    try {
      setIsLoading(true);
      await apiClient.post("/board/task/update/source-destination", {
        status,
        taskId,
        sourceTaskOrderId,
        destinationTaskOrderId,
        sourceTasks,
        destinationTasks,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RefetchContext.Provider value={handleRefetch}>
      <div className="mt-5 space-y-5">
        <button
          onClick={() => setShow(true)}
          className="font-medium px-5 py-1.5 ml-2 rounded-md text-white bg-blue-500 sm:ml-4"
        >
          Add Task
        </button>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="p-2 flex flex-col  space-y-5 sm:grid grid-cols-3 sm:space-y-0 sm:gap-x-4">
            {board.columns.map(({ columnId, tasks, name, taskOrderId }) => (
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
                              taskOrderId={taskOrderId}
                              title={title}
                              description={description}
                              createdAt={createdAt}
                              _id={_id}
                              columnId={columnId}
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
              <TaskForm
                closeDialog={setShow}
                columnId={todoColumn[0].columnId}
              />
            </div>,
            document.body,
          )}

        {isLoading &&
          createPortal(
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 p-3"></div>,
            document.body,
          )}
      </div>
    </RefetchContext.Provider>
  );
};

export default KanbanBoard;
