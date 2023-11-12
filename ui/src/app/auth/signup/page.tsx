"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";

export default function CreateAccountView() {
  const inputValues = {
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [data, setData] = useState(inputValues);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:3333/auth/signup", data).then(function (response) {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="m@example.com"
              onChange={handleChange}
              value={data.email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              id="username"
              type="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div className="flex flex-row">
            <div className="w-11/12">
              <Label htmlFor="firstName">FirstName</Label>
              <Input id="firstName" type="firstName" />
            </div>
            <div className="w-11/12 ">
              <Label htmlFor="lastName">LastName</Label>
              <Input id="lastName" type="lastName" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create account</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
