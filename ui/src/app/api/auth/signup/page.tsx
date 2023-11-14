"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import axios from "axios";
import * as z from "zod";
import { FormSchema } from "./zod.signup.schema";
import { useRouter } from 'next/navigation'

export default function InputForm() {
  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    try {
    const response = await axios.post('http://localhost:3333/auth/signup', data)
    console.log(response.statusText)
    if (response.statusText === 'Created') {
      const router = useRouter()
      router.push('/api/auth/signin')
    }
    } catch (error) {
      console.log(error)  
    }
  }
  return (
    <>
    <AutoForm onSubmit={handleSubmit} className="w-1/2 flex-col" formSchema={FormSchema}>
      <div>
      <AutoFormSubmit>Send now</AutoFormSubmit>
      </div>
    </AutoForm>
    </>
  );
}
