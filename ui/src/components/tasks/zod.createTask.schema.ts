import * as z from "zod";

// TODO: create schemas directory for this and move all schemas there
export const CreateTaskSchema = z.object({
  name: z.string().min(2, {
    message: "task must be at least 2 characters.",
  }),
  description: z.string(),
  inProgress: z.boolean()
});

export type Task = z.infer<typeof CreateTaskSchema>;