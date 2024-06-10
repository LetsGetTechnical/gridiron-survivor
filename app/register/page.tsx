// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX, useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/Input/Input';
import Logo from '@/components/Logo/Logo';
import { Button } from '@/components/Button/Button';
import { registerAccount } from '@/api/apiFunctions';

import logo from '/public/assets/logo-colored-outline.svg';

import { useAuthContext } from '@/context/AuthContextProvider';

/**
 * Renders the registration page.
 * @returns {JSX.Element} The rendered registration page.
 */
export const Register = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { loginAccount, isSignedIn } = useAuthContext();

  /**
   * Handles the email input.
   * @param event - The input event.
   */
  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  /**
   * Handles the password input.
   * @param event - The input event.
   */
  const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  /**
   * Compares the password and confirm password fields.
   * @param password - The password.
   * @param confirmPassword - The confirm password.
   * @returns {boolean} - Whether the passwords match.
   */
  const comparePasswords = (
    password: string,
    confirmPassword: string,
  ): boolean => {
    return password === confirmPassword;
  };

  /**
   * Handles the confirm password input.
   * @param event - The input event.
   * @returns {void}
   */
  const handleConfirmPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setConfirmPassword(event.target.value);
  };

  /**
   * Handles the disabled state of the register button.
   * @returns {boolean} - Whether the button is disabled.
   */
  const handleDisabled = (): boolean => {
    const passwordsMatch = comparePasswords(password, confirmPassword);
    if (email && passwordsMatch === true && confirmPassword !== '') {
      return false;
    }
    return true;
  };

  /**
   * Handles the registration of a new account.
   * @returns {Promise<void>}
   */
  const handleRegister = async (): Promise<void> => {
    try {
      await registerAccount({ email, password });
      await loginAccount({ email, password });
      router.push('/weeklyPicks');
    } catch (error) {
      console.error('Registration Failed', error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      router.push('/weeklyPicks');
    }
  }, [isSignedIn, router]);

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
              If you have an existing account{' '}
              <Link href="/login" className="hover:text-orange-600">
                Login!
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
            <Link href="/login" className="hover:text-orange-600">
              Login to get started playing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
