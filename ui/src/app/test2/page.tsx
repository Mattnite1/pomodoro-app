"use client";
import { useState, useEffect } from "react";
import Timer from "../../components/timer/Timer";
import { Button, ButtonGroup } from "@nextui-org/react";

export default function MyComponent() {
  const [activeTabIndex, setActiveTabIndex] = useState(0); // State to track active tab index
  const [tabTimers, setTabTimers] = useState([10, 10, 10]); // Timers for each tab in seconds

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
  };

  // Function to update timer
  const updateTimer = (index) => {
    const newTimers = [...tabTimers];
    newTimers[index] = 10;
    setTabTimers(newTimers);
  };

  // Effect to decrement timers
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = tabTimers.map((timer, index) => {
        if (index === activeTabIndex && timer > 0) {
          return timer - 1;
        }
        return timer;
      });
      setTabTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTabIndex, tabTimers]);

  useEffect(() => {
    if (tabTimers[activeTabIndex] === 0) {
      const nextTabIndex = (activeTabIndex + 1) % tabTimers.length; // Loop through tabs
      handleTabChange(nextTabIndex);
      updateTimer(nextTabIndex);
    }
  }, [activeTabIndex, tabTimers]);

  return (
    <div className="flex justify-center flex-col w-1/4">
      <ButtonGroup>
        <Button
          variant="light"
          onClick={() => handleTabChange(0)}
          tabIndex={activeTabIndex === 0 ? 0 : -1}
        >
          Tab 1
        </Button>
        <Button
          variant="light"
          onClick={() => handleTabChange(1)}
          tabIndex={activeTabIndex === 1 ? 0 : -1}

        >
          Tab 2
        </Button>
        <Button
          variant="light"
          onClick={() => handleTabChange(2)}
          tabIndex={activeTabIndex === 2 ? 0 : -1}
        >
          Tab 3
        </Button>
      </ButtonGroup>

      <section className="mt-10">
        {activeTabIndex === 0 && <Timer inputMinutes={1} />}
        {activeTabIndex === 1 && <Timer inputMinutes={5} />}
        {activeTabIndex === 2 && <Timer inputMinutes={15} />}
      </section>
    </div>
  );
}
