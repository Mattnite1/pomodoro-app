import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/atoms/avatar"
import { useSession } from "next-auth/react"
 
export function AvatarDemo() {
  const session = useSession()

  return (
    <Avatar>
      <AvatarImage src={session.data?.user?.image} alt="avatar"/>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}