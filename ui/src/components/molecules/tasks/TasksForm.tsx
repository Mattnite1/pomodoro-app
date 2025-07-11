"use client";
import { Button } from "@/components/atoms/button";
import { Input } from "@heroui/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/atoms/use-toast";
import { CreateTaskPayload, Task } from "@/schemas/zod.createTask.schema";
import { useTaskContext } from "@/contexts/TasksContext";
import { createTask } from "@/repositories/taskRepository";

export default function TasksForm() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [formValue, setFormValue] = useState<CreateTaskPayload>({
    name: "",
    description: "",
    inProgress: true,
  });

  const handleInput = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const { addTask }: any = useTaskContext();

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!session) {
      return console.log("ls");
    }
    // TODO: create hook for toasts
    if (formValue.name === "") {
      return toast({
        variant: "destructive",
        title: "Error",
        description: "Your task name cannot be empty",
        duration: 3000,
      });
    }

    try {
      const newTask = await createTask(formValue);

      addTask(newTask);

      toast({
        title: formValue.name,
        description: "task has been created",
        duration: 3000,
      });

      setFormValue({
        name: "",
        description: "",
        inProgress: true,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        duration: 3000,
      });
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          className="mb-5"
          type="text"
          name="name"
          label="name"
          variant="underlined"
          onChange={handleInput}
          value={formValue.name}
        />
        <Input
          type="text"
          label="Description"
          name="description"
          variant="underlined"
          onChange={handleInput}
          value={formValue.description}
        />
        <div className="flex flex-row justify-end align-center mt-4">
          <Button type="submit" variant="outline">
            Add task
          </Button>
        </div>
      </form>
    </>
  );
}
