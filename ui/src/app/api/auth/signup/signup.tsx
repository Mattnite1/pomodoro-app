"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import axios from "axios";
import * as z from "zod";
import { FormSchema } from "./zod.signup.schema";

export default function InputForm() {
  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    await axios.post("http://localhost:3333/auth/signup", data);

  }

  return (
    <>
      <div className="flex justify-center">
        <AutoForm
          onSubmit={handleSubmit}
          className="w-1/2 flex-col"
          formSchema={FormSchema}
        >
          <AutoFormSubmit>Send now</AutoFormSubmit>
        </AutoForm>
      </div>
    </>
  );
}
