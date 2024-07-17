// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX, useEffect, useState } from 'react';
import Logo from '@/components/Logo/Logo';
import logo from '@/public/assets/logo-colored-outline.svg';
import { Button } from '@/components/Button/Button';
import { useAuthContext } from '@/context/AuthContextProvider';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import EmailPasswordForm from './EmailPasswordForm';
import MagicURLForm from './MagicURLForm';

/**
 * Renders the login page.
 * @returns {JSX.Element} The rendered login page.
 */
const Login = (): JSX.Element => {
  const [loginMethod, setLoginMethod] = useState<string>('email');
  const { isSignedIn, getUser } = useAuthContext();

  useEffect(() => {
    if (isSignedIn) {
      getUser();
    }
  }, [isSignedIn, getUser]);

  return (
    <section className="grid xl:grid-cols-2 xl:grid-rows-none">
      <div className="row-span-1 grid w-full place-items-center from-[#4E160E] to-zinc-950 dark:bg-gradient-to-b xl:h-screen xl:bg-gradient-to-b">
        <Logo className="mx-auto w-52 xl:w-64 xl:place-self-end" src={logo} />
        <div className="mx-auto grid gap-4 place-self-end px-8 pb-8 text-foreground text-white">
          <p className="hidden leading-7 xl:block">
            Thank you... fantasy football draft, for letting me know that even
            in my fantasies, I am bad at sports.
          </p>
          <p className="hidden leading-7 xl:block">Jimmy Fallon</p>
        </div>
      </div>
      <div className="row-span-1 mx-auto grid max-w-sm justify-center space-y-4 px-4 xl:flex xl:flex-col">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight">
            Join Gridiron Survivor
          </h1>

          {loginMethod === 'emailPassword' ? (
            <p className="pb-4 font-normal leading-7 text-zinc-500">
              Log in to your existing account or{' '}
              <LinkCustom href="/register">sign up</LinkCustom> to get started
              with a league
            </p>
          ) : (
            <p className="pb-4 font-normal leading-7 text-zinc-500">
              Enter your email to login and get started with a league
            </p>
          )}
        </div>

        {loginMethod === 'emailPassword' ? (
          <EmailPasswordForm />
        ) : (
          <MagicURLForm />
        )}

        <div className="flex w-full items-center justify-center gap-2">
          <div className="flex-grow border border-b" />
          <span className="">or continue with</span>
          <div className="flex-grow border border-b" />
        </div>
        <Button
          data-testid="login-method-button"
          label={loginMethod === 'emailPassword' ? 'Email' : 'Email & Password'}
          variant="outline"
          onClick={() =>
            setLoginMethod(loginMethod === 'email' ? 'emailPassword' : 'email')
          }
        />

        {loginMethod === 'emailPassword' && (
          <LinkCustom href="/register">
            Sign up to get started with a league
          </LinkCustom>
        )}
      </div>
    </section>
  );
};

export default Login;
