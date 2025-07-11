import * as z from "zod";

export const CreateTaskSchema = z.object({
  name: z.string().min(2, {
    message: "task must be at least 2 characters.",
  }),
  description: z.string(),
  inProgress: z.boolean(),
});

export type CreateTaskPayload = z.infer<typeof CreateTaskSchema>;
export type Task = CreateTaskPayload & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};
