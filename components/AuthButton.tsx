import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthButton() {
  const cookieStore = cookies();
  // Assume user is always logged in for demonstration purposes
  const user = { email: 'example@example.com' };

  const signOut = async () => {
    // Perform sign out logic here
    // For example, clear cookies or session variables
    return redirect('/login');
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form onSubmit={signOut}>
        <button type="submit" className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link href="/login" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
      Login
    </Link>
  );
}