'use client'
import {Link} from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import DropdownMenuView from "../DropdownMenu";

function CheckSession() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <DropdownMenuView />
      </>
    );
  }
  return (
    <>
      <Link href={''} onClick={() => signIn()} underline="focus" className="mr-5">Sign in</Link> 
      <Link href="/api/auth/signup" underline="focus">Create an Account</Link> 
    </>
  );
}

export default function NavBar() {
  return (
      <CheckSession />
  )
}