"use client";
import * as React from "react";
import CreateTasks from "@/components/tasks/CreateTasks";
import { TaskProvider } from "@/components/tasks/TasksContext";
import ShowTasks from "@/components/tasks/ShowTasks";
import TabsComponent from "@/components/view/Tabs";
import {HeroUIProvider} from "@heroui/react";


export default function Home() {
  return (
    <>
      <HeroUIProvider>
        <section className="flex flex-col justify-center w-1/4 m-auto">
          <TabsComponent />
          <section className="flex flex-col justify-center">
            <TaskProvider>
              <CreateTasks />
              <ShowTasks />
            </TaskProvider>
          </section>
        </section>
      </HeroUIProvider>
    </>
  );
}
