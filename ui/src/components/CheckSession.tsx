import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthCheck() {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

}
