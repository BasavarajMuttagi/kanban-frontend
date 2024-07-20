import { forwardRef, HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  status: string;
};

const TaskContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & Props
>(({ children, status, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      {...rest}
      className="w-full min-h-screen border border-neutral-300 rounded-md  px-2 py-5 sm:px-3"
    >
      <div className="w-full flex flex-col items-center space-y-4 shrink-0">
        <div className="bg-blue-500 p-2 rounded-sm w-full">
          <p className="font-bold text-xl tracking-wider text-white">
            {status}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
});

export default TaskContainer;
