"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@heroui/react";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { CreateTaskSchema } from "./zod.createTask.schema";
import { useToast } from "@/components/ui/use-toast";
import { useTaskContext } from "./TasksContext";

export default function CreateTasks() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [formValue, setFormValue] = useState<z.infer<typeof CreateTaskSchema>>({
    name: "",
    description: "",
    inProgress: true,
  });

  const handleInput = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const { addTask }: any = useTaskContext();

  async function handleSubmit(e: any) {

    e.preventDefault()

    if (!session) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: "You have to login",
        duration: 3000,
      });
    }

    if (formValue.name === "") {
      return toast({
        variant: "destructive",
        title: "Error",
        description: "Your task name cannot be empty",
        duration: 3000,
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:3333/tasks",
        formValue,
        {
          headers: { Authorization: "Bearer " + session?.user?.refresh_token },
        }
      );

      const newTask = response.data;

      if (session) {
        addTask(newTask);
      }

      if ((response.status === 201)) {
        toast({
          title: formValue.name,
          description: "task has been created",
          duration: 3000,
        });
      }

      setFormValue({
        name: "",
        description: "",
        inProgress: true,
      });

    } catch (error) {
      console.log(error);
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
