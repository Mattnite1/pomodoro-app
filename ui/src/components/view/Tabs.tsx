"use client";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import Timer from "./timer/Timer";
import CreateTaskView from "../tasks/CreateTasks";
import ShowTasks from "../tasks/ShowTasks";
import { TaskProvider } from "../tasks/ShowTaskContext";

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);

      if (timer === 0) {
        setActiveTab((prevActiveTab) => (prevActiveTab === 0 ? 1 : 0));
        setTimer(5);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
    setTimer(5);
  };

  return (
    <div className="flex flex-col gap-2">
      <Tabs variant="underlined" className="flex justify-center">
        <Tab aria-label="Tab 1" key="pomodoro" title="Pomodoro">
          <Card>
            <CardBody>
              <Timer inputMinutes={25} />
            </CardBody>
          </Card>
        </Tab>
        <Tab aria-label="Tab 2" key="siema" title="Short Break">
          <Card>
            <CardBody>
              <Timer inputMinutes={5} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="siema2" title="Long Break">
          <Card>
            <CardBody>
              <Timer inputMinutes={15} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      <TaskProvider>
        <CreateTaskView />
        <ShowTasks />
      </TaskProvider>
    </div>
  );
}
