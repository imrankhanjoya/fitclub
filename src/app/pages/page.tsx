"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  if(session){
    console.log("session value")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {session && <p>
          You are loggeding
          </p>}
          {!session && <p>
          You are not loggeding
          </p>}
          <p>Not Signed In</p>
        <button onClick={() => signIn('google')}>Sign in with google</button>


    </main>
  );
}
