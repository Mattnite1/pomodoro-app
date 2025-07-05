import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// TODO: remove views from components
// TODO: remove view directory
export default async function AuthCheck() {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

}
