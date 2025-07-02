"use client";
import { Checkbox } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useTaskContext } from "./ShowTaskContext";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Task {
  name: string;
  description: string;
  inProgress: boolean;
  id: number;
}

export default function ShowTasks() {
  const { data: session } = useSession();
  const { tasks }: any = useTaskContext();
  const { addTask }: any = useTaskContext();

  
  const [isChecked, setChecked] = useState(true);

  const handleInput = async (taskId: number) => {
    setChecked(() => !isChecked);

    try {
      const response = await axios.patch(
        `http://localhost:3333/tasks/${taskId}`,
        { inProgress: !isChecked },
        {
          headers: { Authorization: "Bearer " + session?.user?.refresh_token },
        }
      );
      const newTask = response.data;
      console.log(newTask);

      if (session) {
        addTask(newTask, response.data.inProgress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!session ? null : <h1>Your uncompleted tasks:</h1>}
      <ScrollArea className="h-48 w-96 mb-10">
        <Accordion isCompact>
          {tasks.map((task: Task) =>
            task.inProgress ? (
              <AccordionItem
                key={task.id}
                title={task.name}
                textValue="Accessible Text Content"
              >
                <p className="text-sm">{task.description}</p>
                <div className="flex justify-end m-2">
                  <Checkbox
                    size="sm"
                    onChange={() => handleInput(task.id)}
                    name="inProgress"
                  >
                    Completed
                  </Checkbox>
                </div>
              </AccordionItem>
            ) : null
          )}
        </Accordion>
      </ScrollArea>
    </>
  );
}
