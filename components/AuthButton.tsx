'use client'; //client component since nextjs are automatically serverside components

import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function AuthButton() {
  //Assume user is always logged in for demonstration purposes
  const user = { email: 'example@example.com' };

  const signOut = async () => {
    // Perform sign out logic here
    // For example, clear cookies or session variables
    return redirect('/login');
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <button
        type="submit"
        className="bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 no-underline"
      >
        Logout
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
    >
      Login
    </Link>
  );
}

//  export default AuthButton;
