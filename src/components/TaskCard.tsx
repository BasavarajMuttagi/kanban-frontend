import {
  Article,
  CircleNotch,
  PencilSimpleLine,
  Trash,
} from "@phosphor-icons/react";
import { forwardRef, HTMLAttributes, useContext, useState } from "react";
import { createPortal } from "react-dom";
import UpdateTaskForm from "./UpdateTaskForm";
import apiClient from "../axios/apiClient";
import { RefetchContext } from "./KanbanBoard";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  description: string;
  createdAt: string;
  _id: string;
  columnId: string;
  taskOrderId: string;
};

const TaskCard = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & Props
>(({ title, description, createdAt, _id, taskOrderId, ...rest }, ref) => {
  const refetch = useContext(RefetchContext);
  const [show, setShow] = useState(false);
  const [heading, setHeading] = useState<string>("Update Task");
  const [formType, setFormType] = useState<"VIEW" | "UPDATE">("UPDATE");
  const [isLoading, setIsLoading] = useState(false);
  const switchFormType = (formType: "VIEW" | "UPDATE") => {
    setFormType(formType);
    if (formType === "UPDATE") {
      setHeading("Update Task");
    } else {
      setHeading("View Task");
    }
  };

  const deleteTaskAndUpdateOrder = async (
    taskId: string,
    taskOrderId: string,
  ) => {
    try {
      setIsLoading(true);
      await apiClient.post("/board/task/delete", {
        taskId,
        taskOrderId,
      });
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      aria-disabled={isLoading}
      ref={ref}
      {...rest}
      className={twMerge(
        "shadow  h-44 w-full rounded-md bg-blue-200 p-3 space-y-1.5 flex flex-col justify-between",
        isLoading ? "brightness-80" : "",
      )}
    >
      <p className="font-semibold text-base text-neutral-900 truncate">
        {title}
      </p>
      <div className="text-base text-neutral-800/95 line-clamp-5">
        {description}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-neutral-500 font-medium">{createdAt}</div>
        <div className="flex items-center space-x-5 justify-end">
          <button
            onClick={(e) => {
              deleteTaskAndUpdateOrder(_id, taskOrderId), e.stopPropagation();
            }}
          >
            {isLoading ? (
              <CircleNotch size={18} className="animate-spin text-red-500" />
            ) : (
              <Trash size={24} weight="fill" className="text-red-500" />
            )}
          </button>
          <button onClick={() => switchFormType("UPDATE")}>
            <PencilSimpleLine
              size={24}
              weight="fill"
              className="text-neutral-600"
            />
          </button>
          <button onClick={() => switchFormType("VIEW")}>
            <Article size={24} weight="fill" className="text-green-600" />
          </button>
        </div>
      </div>
      {show &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 p-3">
            <UpdateTaskForm
              closeDialog={setShow}
              taskId={_id}
              title={title}
              description={description}
              heading={heading}
              formType={formType}
            />
          </div>,
          document.body,
        )}
    </div>
  );
});

export default TaskCard;
