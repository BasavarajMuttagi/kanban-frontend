import { useForm } from "react-hook-form";
import { updateTaskSchema, updateTaskType } from "../zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useContext } from "react";
import apiClient from "../axios/apiClient";
import { RefetchContext } from "./KanbanBoard";

const UpdateTaskForm = ({
  closeDialog,
  taskId,
  title,
  description,
  status,
}: {
  closeDialog: Dispatch<SetStateAction<boolean>>;
  taskId: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}) => {
  const refetch = useContext(RefetchContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<updateTaskType>({
    defaultValues: { title, description, status },
    resolver: zodResolver(updateTaskSchema),
  });

  const submitHandler = async (data: updateTaskType) => {
    try {
      await apiClient.post(`/board/task/update/${taskId}`, data);
      reset();
      refetch();
      closeDialog((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-md flex flex-col items-center space-y-8 rounded-md shadow w-full py-5 px-4 bg-white">
      <h1 className="font-bold text-2xl">Update Task</h1>
      <form className="space-y-7 w-full" onSubmit={handleSubmit(submitHandler)}>
        <div className="relative">
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full p-2 rounded-sm outline-none border border-neutral-400/80 text-neutral-500 font-medium"
          />
          {errors.title && (
            <p className="text-red-400 text-xs absolute">
              {errors.title?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full p-2 rounded-sm outline-none border border-neutral-400/80 text-neutral-500 font-medium h-56"
          />
          {errors.description && (
            <p className="text-red-400 text-xs absolute">
              {errors.description?.message}
            </p>
          )}
        </div>
        <div className="relative flex items-center space-x-2">
          <label htmlFor="dropdown" className="text-neutral-500">
            Status:
          </label>

          <select
            {...register("status")}
            className="w-full border border-neutral-400/80 rounded-md px-3 py-2 outline-none text-neutral-500"
            id="dropdown"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          {errors.status && (
            <p className="text-red-400 text-xs absolute">
              {errors.status?.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => closeDialog((prev) => !prev)}
            className="px-3 py-2 rounded-md bg-violet-500 text-white  font-semibold tracking-wider hover:brightness-90"
          >
            Close
          </button>
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-blue-500 text-white  font-semibold tracking-wider hover:brightness-90"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
