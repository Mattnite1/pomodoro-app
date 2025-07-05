"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { AvatarDemo } from "./view/Avatar";
import Link from "next/link";

// TODO: Should be molecule
export default function DropdownMenuComponent() {
  const { data: session } = useSession();

  return (
    <section className="fixed m-1">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarDemo />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="border-t w-full">
            <Link href={"/"}>Pomodoro</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="border-t w-full">
            {session ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : null}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
