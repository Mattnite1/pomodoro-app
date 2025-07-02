"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { AvatarDemo } from "./view/Avatar";
import Link from "next/link";

export default function DropdownMenuComponent() {
  const { data: session } = useSession();

  return (
    <div className="fixed m-1">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarDemo />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={"/dashboard"}>
              <p className="font-bold">My Account</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/"}>Pomodoro</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/history"}>History</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Friends</DropdownMenuItem>
          <DropdownMenuItem className="border-t w-full">
            {session ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : null}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
