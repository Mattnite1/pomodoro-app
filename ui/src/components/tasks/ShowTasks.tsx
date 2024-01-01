"use client";
import axios from "axios";
import { Checkbox } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface Task {
  id: number;
  name: string;
  description: string;
  inProgress: boolean;
}

export default function ShowTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    const currentSession = await getSession();

    if (currentSession) {
      try {
        axios
          .get("http://localhost:3333/tasks", {
            headers: {
              Authorization: "Bearer " + currentSession?.user?.refresh_token,
            },
          })
          .then((response) => {
            setTasks(response.data);
          });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  fetchData();

  return (
    <>
      <h1>Your Tasks:</h1>
      <ScrollArea className="h-40 w-96 mb-10">
        <Accordion isCompact>
          {tasks.map((task) =>
            task.inProgress ? (
              <AccordionItem
                key={task.id}
                title={task.name}
                textValue="Accessible Text Content"
              >
                <p className="text-sm">{task.description}</p>
                <div className="flex justify-end m-2">
                  <Checkbox size="sm">Completed</Checkbox>
                </div>
              </AccordionItem>
            ) : null
          )}
        </Accordion>
      </ScrollArea>
    </>
  );
}
