'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import Logo from '@/components/Logo/Logo';
import logo from '/public/assets/logo-colored-outline.svg';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { loginAccount } from '@/api/apiFunctions';
import { account } from '@/api/config';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    await loginAccount({ email, password });
    setIsLoggedIn((await account.get()) as any);
    const data =  await account.get();
    localStorage.setItem("id", data.$id);
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/weeklyPicks');
    }else{
      router.push('/login');
    }
  }, [isLoggedIn]);

  return (
    <div className="h-screen w-full">
      <div className="grid h-screen w-full grid-cols-2 bg-gradient-to-b from-[#4E160E] to-zinc-950">
        <div className="grid p-8">
          <div className="grid">
            <Logo className="mx-auto place-self-end" src={logo} />
          </div>
          <div className="mx-auto grid gap-4 place-self-end">
            <p className="leading-7 text-white">
              Thank you... fantasy football draft, for letting me know that even
              in my fantasies, I am bad at sports.
            </p>
            <p className="leading-7 text-white">Jimmy Fallon</p>
          </div>
        </div>
        <div className="grid place-content-center bg-white p-8">
          <div className="mx-auto grid w-80 place-content-center gap-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
              Join Gridiron Survivor
            </h1>
            <p className="pb-4 font-normal leading-7 text-zinc-500">
              <Link href="/register">
                Log in to your existing account or sign up to get started with a
                league
              </Link>
            </p>
            <Input
              type="email"
              value={email}
              placeholder="Email"
              onChange={handleEmail}
            />
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePassword}
            />
            <Button
              label="Continue"
              disabled={!email && !password}
              onClick={handleLogin}
            />
            <Link href="/register">Sign up to get started with a league</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
