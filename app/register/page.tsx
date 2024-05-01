'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/Input/Input';
import Logo from '@/components/Logo/Logo';
import { Button } from '@/components/Button/Button';
import { loginAccount, registerAccount } from '@/api/apiFunctions';
import { account } from '@/api/config';

import logo from '/public/assets/logo-colored-outline.svg';

export default function () {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const comparePasswords = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const handleConfirmPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setConfirmPassword(event.target.value);
  };

  const handleDisabled = () => {
    const passwordsMatch = comparePasswords(password, confirmPassword);
    if (email && passwordsMatch === true && confirmPassword != '') {
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      await registerAccount({ email, password });

      await loginAccount({ email, password });

      setIsLoggedIn(true);
      router.push('/weeklyPicks');
    } catch (error) {
      console.error('Registration Failed');
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const getSession = () => {
      try {
        const session = localStorage.getItem('cookieFallback');
        if (session) setIsLoggedIn(true);
      } catch (error) {
        console.error(
          'Why did the fantasy football team go to the bank? To get their quarterback!',
        );
      }
    };

    getSession();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/weeklyPicks');
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
              Register A New Account
            </h1>
            <p className="pb-4 font-normal leading-7 text-zinc-500">
              <Link href="/login">If you have an existing account Login!</Link>
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
            <Input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleConfirmPassword}
            />
            <Button
              label="Register"
              disabled={handleDisabled()}
              onClick={handleRegister}
            />
            <Link href="/login">Login to get started playing</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
