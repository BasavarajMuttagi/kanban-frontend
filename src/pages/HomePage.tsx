import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import TaskContainer from "../components/TaskContainer";
import TaskCard from "../components/TaskCard";
import { TaskBoard } from "../types";
import { createPortal } from "react-dom";
import TaskForm from "../components/TaskForm";

const initialTasks: TaskBoard = {
  DONE: [],
  IN_PROGRESS: [],
  TODO: [],
};

const HomePage = () => {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState<TaskBoard>(initialTasks);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    //dropped outside
    if (!destination) {
      return;
    }

    //same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    type TaskBoardKeys = keyof TaskBoard;

    //move from one column to another
    const sourceColumn = tasks[source.droppableId as TaskBoardKeys];
    const destColumn = tasks[destination.droppableId as TaskBoardKeys];
    const [movedTask] = sourceColumn.splice(source.index, 1);

    // update source and destination priority number
    destColumn.splice(destination.index, 0, movedTask);

    destColumn.forEach((task, index) => {
      task.priority = index;
      task.status = destination.droppableId as TaskBoardKeys;
    });

    sourceColumn.forEach((task, index) => {
      task.priority = index;
      task.status = source.droppableId as TaskBoardKeys;
    });

    // update the state
    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
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
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <TaskContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  status={columnId}
                >
                  {columnTasks.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <TaskCard
                          title={task.title}
                          description={task.title}
                          createdAt={task.createdAt}
                          _id={task._id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        />
                      )}
                    </Draggable>
                  ))}
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
            <TaskForm closeDialog={setShow} />
          </div>,
          document.body,
        )}
    </div>
  );
};

export default HomePage;
