import { useForm } from "react-hook-form";
import { newTaskSchema, newTaskType } from "../zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import apiClient from "../axios/apiClient";
import { RefetchContext } from "./KanbanBoard";
import toast from "react-hot-toast";
import { CircleNotch } from "@phosphor-icons/react";

const TaskForm = ({
  closeDialog,
  columnId,
}: {
  closeDialog: Dispatch<SetStateAction<boolean>>;
  columnId: string;
}) => {
  const [isSpin, setIsSpin] = useState(false);
  const refetch = useContext(RefetchContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<newTaskType>({
    defaultValues: { columnId },
    resolver: zodResolver(newTaskSchema),
  });

  const submitHandler = async (data: newTaskType) => {
    try {
      setIsSpin(true);
      await apiClient.post("/board/task/create", data);
      reset();
      refetch();
      closeDialog((prev) => !prev);
    } catch (error) {
      toast.error("Something went");
      console.log(error);
    } finally {
      setIsSpin(false);
    }
  };
  return (
    <div className="max-w-md flex flex-col items-center space-y-8 rounded-md shadow w-full py-5 px-4 bg-white">
      <h1 className="font-bold text-2xl">Add Task</h1>
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
        <div className="flex items-center justify-between">
          <button
            onClick={() => closeDialog((prev) => !prev)}
            className="px-3 py-2 rounded-md bg-violet-500 text-white  font-semibold tracking-wider hover:brightness-90"
          >
            Close
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-500 text-white  font-semibold tracking-wider hover:brightness-90"
          >
            <p>Add Task</p>
            {isSpin && <CircleNotch size={18} className="animate-spin" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
