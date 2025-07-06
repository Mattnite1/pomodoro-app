"use client";
import * as React from "react";
import { TaskProvider } from "@/contexts/TasksContext";
import TabsComponent from "@/components/molecules/Tabs";
import {HeroUIProvider} from "@heroui/react";
import TasksForm from "@/components/molecules/tasks/TasksForm";
import TasksList from "@/components/molecules/tasks/TasksList";


export default function Home() {
  return (
    <>
      <HeroUIProvider>
        <section className="flex flex-col justify-center w-1/4 m-auto">
          <TabsComponent />
          <section className="flex flex-col justify-center">
            <TaskProvider>
              <TasksForm />
              <TasksList />
            </TaskProvider>
          </section>
        </section>
      </HeroUIProvider>
    </>
  );
}
