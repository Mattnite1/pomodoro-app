import { CreateTaskPayload, Task } from "@/schemas/zod.createTask.schema";
import { axiosApiInstance } from "../../axios";

const createTask = (createTaskPayload: CreateTaskPayload): Promise<Task> =>
  axiosApiInstance.post("/tasks", createTaskPayload).then(({ data }) => data);

export { createTask };






