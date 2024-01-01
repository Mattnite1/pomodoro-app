"use client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Profile() {
  const {data: session} = useSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <p>{session.user?.name}</p>
  )
  
}
