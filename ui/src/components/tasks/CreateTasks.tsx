"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { CreateTaskSchema } from "./zod.createTask.schema";
import { useToast } from "@/components/ui/use-toast";
import ShowTasks from "./ShowTasks";

export default function CreateTaskView() {
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

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (formValue.name === "") {
      return toast({
        variant: "destructive",
        title: 'Error',
        description: 'Your task name cannot be empty',
        duration: 3000
      })
    }

    try {
      const response = await axios.post(
        "http://localhost:3333/tasks",
        formValue,
        {
          headers: { Authorization: "Bearer " + session?.user?.refresh_token },
        }
      );

      if ((response.status = 201)) {
        toast({
          title: formValue.name,
          description: "Your task has been created",
          duration: 3000
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
          type="text"
          variant="underlined"
          label="Task"
          name="name"
          onChange={handleInput}
          value={formValue.name}
        />
        <Input
          type="text"
          variant="underlined"
          label="Description"
          name="description"
          onChange={handleInput}
          value={formValue.description}
        />
        <div className="flex flex-row justify-end align-center mt-2">
          <Button type="submit" variant="outline" onClick={() => {ShowTasks}}>
            Add task
          </Button>
        </div>
      </form>
    </>
  );
}
