import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.email} <br />
        <button onClick={() => signOut()}>signOut</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>signIn</button>
    </>
  );
}

export default function NavMenu() {
  return <AuthButton />;
}
