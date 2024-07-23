import { z } from "zod";

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
});

type userLoginType = z.infer<typeof userLoginSchema>;

const userSignUpSchema = z
  .object({
    firstname: z.string().min(1, { message: "first name is required" }),
    lastname: z.string().min(1, { message: "last name is required" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "password cannot be less than 8 digits" })
      .max(10, { message: "password cannot be more than 10 digits" }),
    confirmpassword: z
      .string()
      .min(8, { message: "password cannot be less than 8 digits" })
      .max(10, { message: "password cannot be more than 10 digits" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });

type userSignUpType = z.infer<typeof userSignUpSchema>;

const newTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  columnId: z.string().min(24),
});

type newTaskType = z.infer<typeof newTaskSchema>;

const updateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

type updateTaskType = z.infer<typeof updateTaskSchema>;

const newBoardSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

type newBoardType = z.infer<typeof newBoardSchema>;
export type {
  userLoginType,
  userSignUpType,
  newTaskType,
  newBoardType,
  updateTaskType,
};
export {
  userLoginSchema,
  userSignUpSchema,
  newTaskSchema,
  newBoardSchema,
  updateTaskSchema,
};
