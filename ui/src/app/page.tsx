"use client";
import NavBar from "@/components/view/NavBar";
import TabsComponent from "@/components/view/Tabs";
import { NextUIProvider } from "@nextui-org/react";
import CreateTaskView from "@/components/tasks/CreateTasks";

export default function Home() {
  return (
    <>
      <NextUIProvider>
        <section className="flex justify-center">
          <TabsComponent />
        </section>
      </NextUIProvider>
    </>
  );
}
