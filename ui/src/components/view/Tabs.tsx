"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from '@nextui-org/react';
import { Card, CardBody } from "@nextui-org/react";
import Timer from "./timer/Timer";
import CreateTaskView from "../tasks/CreateTasks";
import ShowTasks from "../tasks/ShowTasks";

export default function TabsComponent() {

  return (
    <div className="flex flex-col gap-2">
      <Tabs variant="underlined" className="flex justify-center" >
        <Tab key="pomodoro" title="Pomodoro" value={0}>
          <Card>
            <CardBody>
              <Timer inputMinutes={25}/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="siema" title="Short Break" value={1}>
          <Card>
            <CardBody>
              <Timer inputMinutes={5}/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="siema2" title="Long Break" value={2}>
          <Card>
            <CardBody>
              <Timer inputMinutes={15}/>
            </CardBody>
          </Card>  
        </Tab>
        </Tabs>
      <CreateTaskView />
      <ShowTasks />
    </div>
  );
}
