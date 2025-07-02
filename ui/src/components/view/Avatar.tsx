import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
 
export function AvatarDemo() {
  const session = useSession()
  return (
    <Avatar>
      <AvatarImage src={session.data?.user?.image} alt="siema"/>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}