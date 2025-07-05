import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
 
// TODO: Move to Molecules
export function AvatarDemo() {
  const session = useSession()

  return (
    <Avatar>
      <AvatarImage src={session.data?.user?.image} alt="avatar"/>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}