import { useForm } from "react-hook-form";
import { newBoardSchema, newBoardType } from "../zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import apiClient from "../axios/apiClient";

const BoardForm = ({
  closeDialog,
}: {
  closeDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<newBoardType>({
    resolver: zodResolver(newBoardSchema),
  });

  const submitHandler = async (data: newBoardType) => {
    try {
      await apiClient.post("/board/create-board", data);
      reset();
      closeDialog((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <div className="max-w-md flex flex-col items-center space-y-8 rounded-md shadow w-full py-5 px-4 bg-white">
      <h1 className="font-bold text-2xl">Create New Board</h1>
      <form className="space-y-7 w-full" onSubmit={handleSubmit(submitHandler)}>
        <div className="relative">
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full p-2 rounded-sm outline-none border border-neutral-400/80 text-neutral-500 font-medium"
          />
          {errors.name && (
            <p className="text-red-400 text-xs absolute">
              {errors.name?.message}
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
            className="px-3 py-2 rounded-md bg-blue-500 text-white  font-semibold tracking-wider hover:brightness-90"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardForm;
