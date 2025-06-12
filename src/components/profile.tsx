'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <button className="bg-black" onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <>
      Not signed in <br />
      <button className="bg-black" onClick={() => signIn()}>Sign in</button>
    </>
  );
}
