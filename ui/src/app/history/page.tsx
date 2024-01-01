import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth";

export default async function History() {
    const session = await getServerSession()
    if (!session) {
        redirect('/api/auth/signin')
    }
    return ('siema historia')
}