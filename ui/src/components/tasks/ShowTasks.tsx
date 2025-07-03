"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@heroui/checkbox";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useTaskContext } from "./TasksContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  name: string;
  description: string;
  inProgress: boolean;
  id: number;
}

export default function ShowTasks() {
  const { data: session } = useSession();
  const { tasks, deleteTask }: any = useTaskContext();
  const { toast } = useToast();

  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:3333/tasks/${taskId}`, {
        headers: { Authorization: "Bearer " + session?.user?.refresh_token },
      });

      toast({
        title: "removed correctly",
        duration: 3000,
      });

      deleteTask(taskId);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!session ? null : <h1>To Do:</h1>}
      <ScrollArea className="h-48 w-96 mb-10">
        <Accordion isCompact>
          {tasks.map((task: Task) =>
            task.inProgress ? (
              <AccordionItem key={task.id} title={task.name}>
                <p className="text-sm">{task.description}</p>
                <div className="flex justify-end m-2">
                  <Checkbox
                    size="sm"
                    onChange={() => handleDeleteTask(task.id)}
                  >
                    Remove
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
