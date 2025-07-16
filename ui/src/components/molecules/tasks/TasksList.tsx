"use client";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Checkbox } from "@heroui/checkbox";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/atoms/use-toast";
import { useTaskContext } from "@/contexts/TasksContext";
import { axiosApiInstance } from "../../../../axios";
import { Task } from "@/schemas/zod.createTask.schema";

export default function TasksList() {
  const { data: session } = useSession();
  const { tasks, deleteTask }: any = useTaskContext();
  const { toast } = useToast();

  const handleDeleteTask = async (taskId: number) => {
    try {
      await axiosApiInstance.delete(`/tasks/${taskId}`);

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
