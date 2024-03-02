"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()
  if(session){
    console.log("session value")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {!session && <p>
          You are not loggeding
          </p>}
        <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Get Started</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
    </div>

    <div className="lg:w-1/2 text-center md:w-2/3 m-auto">
            {session && <p>You are logged in</p>}
            <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => signIn('google')}>Sign in with google</button>
  
    </div>
  </div>
</section>

    </main>
  );
}
