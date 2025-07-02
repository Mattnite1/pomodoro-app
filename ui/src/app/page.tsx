"use client";
import CreateTaskView from "@/components/tasks/CreateTasks";
import { TaskProvider } from "@/components/tasks/ShowTaskContext";
import ShowTasks from "@/components/tasks/ShowTasks";
import TabsComponent from "@/components/view/Tabs";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <NextUIProvider>
        <section className="flex flex-col justify-center w-1/4 m-auto">
          <TabsComponent />
          <section className="flex flex-col justify-center">
            <TaskProvider>
              <CreateTaskView />
              <ShowTasks />
            </TaskProvider>
          </section>
        </section>
      </NextUIProvider>
    </>
  );
}
