import { Article, PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { forwardRef, HTMLAttributes, useState } from "react";
import { createPortal } from "react-dom";
import UpdateTaskForm from "./UpdateTaskForm";

type Props = {
  title: string;
  description: string;
  createdAt: string;
  _id: string;
};

const TaskCard = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & Props
>(({ title, description, createdAt, _id, ...rest }, ref) => {
  const [show, setShow] = useState(false);
  return (
    <div
      ref={ref}
      {...rest}
      onClick={() => setShow(true)}
      className="shadow  h-44 w-full rounded-md bg-blue-200 p-3 space-y-1.5 flex flex-col justify-between"
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
          <button>
            <Trash size={24} weight="fill" className="text-red-500" />
          </button>
          <button>
            <PencilSimpleLine
              size={24}
              weight="fill"
              className="text-neutral-600"
            />
          </button>
          <button>
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
            />
          </div>,
          document.body,
        )}
    </div>
  );
});

export default TaskCard;
