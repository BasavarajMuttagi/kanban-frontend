import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  description: string;
  createdAt: string;
  _id: string;
  closeDialog: Dispatch<SetStateAction<boolean>>;
};

const TaskDetails = ({ title, description, createdAt, closeDialog }: Props) => {
  return (
    <div className="shadow space-y-5 w-full h-[80vh] rounded-md bg-blue-200 p-3 flex flex-col justify-between sm:max-w-md">
      <p className="font-medium text-lg text-neutral-600 truncate border-b pb-1 border-neutral-600">
        Task Details
      </p>
      <p className="font-semibold text-base text-neutral-900 truncate">
        {title}
      </p>
      <div className="text-base text-neutral-800/95 overflow-scroll h-full">
        {description}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-neutral-500 font-medium">{createdAt}</div>
        <button
          onClick={() => closeDialog((prev) => !prev)}
          className="text-base font-medium px-3 py-1.5 rounded-md bg-violet-400"
        >
          close
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
