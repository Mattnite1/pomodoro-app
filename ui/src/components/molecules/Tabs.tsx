"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import Timer from "./timer/Timer";

type TabMode = "study" | "shortBreak" | "longBreak";

const tabsOrder: TabMode[] = [
  "study",
  "shortBreak",
  "study",
  "shortBreak",
  "study",
  "shortBreak",
  "study",
  "longBreak",
];

const modes: Record<TabMode, number> = {
  study: 5,
  shortBreak: 6,
  longBreak: 7,
};

// TODO: Remove function, add real type from setCurrentModeIndex
interface TimerTab {
  key: TabMode;
  title: string;
  content: JSX.Element;
}

let tabs = (goToNextModeIndex: Function): TimerTab[] => [
  {
    key: "study",
    title: "study",
    content: <Timer onTimeEnd={goToNextModeIndex} inputMinutes={modes.study} />,
  },
  {
    key: "shortBreak",
    title: "short break",
    content: (
      <Timer onTimeEnd={goToNextModeIndex} inputMinutes={modes.shortBreak} />
    ),
  },
  {
    key: "longBreak",
    title: "long break",
    content: (
      <Timer onTimeEnd={goToNextModeIndex} inputMinutes={modes.longBreak} />
    ),
  },
];

export default function TabsComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMode = tabsOrder[currentIndex];

  const goToNextModeIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tabsOrder.length);
  };

  return (
    <Tabs
      items={tabs(goToNextModeIndex)}
      variant="underlined"
      className="flex justify-center"
      selectedKey={currentMode}
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
} //
