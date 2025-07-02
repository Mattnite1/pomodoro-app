"use client";
import TabsComponent from "@/components/view/Tabs";
import { NextUIProvider } from "@nextui-org/react";

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
