"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function Buttom() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <div>
          <h1>{session.user.name}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      </>
    );
  }
}
