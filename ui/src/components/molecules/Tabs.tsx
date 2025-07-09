"use client";
import React, { useState, useEffect } from "react";
import {Tabs, Tab} from "@heroui/tabs";
import {Card, CardBody, } from "@heroui/card";
import Timer from "./timer/Timer";

type TabName = "study" | "s-break" | "l-break";

  const modes = [
    "study",
    "s-break",
    "study",
    "s-break",
    "study",
    "s-break",
    "study",
    "l-break",
  ];

  let tabs = [
    {
      key: "study",
      title: "pomodoro",
      content: <Timer inputMinutes={25} />,
    },
    {
      key: "s-break",
      title: "short break",
      content: <Timer inputMinutes={5} />,
    },
    {
      key: "l-break",
      title: "long break",
      content: <Timer inputMinutes={15} />,
    },
  ];
  
export default function TabsComponent() {
  const [timer, setTimer] = useState<number>(5);
  const [currentModeIndex, setCurrentModeIndex] = useState<number>(0);


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer === 0) {
        const nextModeIndex = (currentModeIndex + 1) % modes.length;
        setCurrentModeIndex(nextModeIndex);
        setTimer(5);
      } else {
        setTimer((prevTimer: number) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentModeIndex, timer, modes.length]);

  const activeTab = modes[currentModeIndex];

  return (
      <Tabs
        items={tabs}
        variant="underlined"
        className="flex justify-center"
        selectedKey={activeTab as TabName}
      >
        {(item) => (
          <Tab key={item.key} title={item.title}>
            <Card>
              <CardBody>{item.content}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
  );
}
