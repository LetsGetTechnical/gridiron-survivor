'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo/Logo';
import logo from '@/public/assets/logo-colored-outline.svg';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { useAuthContext } from '@/context/AuthContextProvider';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/Form/Form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loginAccount, isSignedIn } = useAuthContext();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/weeklyPicks');
    }
  }, [isSignedIn]);

  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const LoginUserSchema = z.object({
    email: z
      .string()
      .min(1, { message: 'Please enter an email address' })
      .email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(1, { message: 'Please enter a password' })
      .min(6, { message: 'Password must be at least 6 characters' }),
  });

  const form = useForm<z.infer<typeof LoginUserSchema>>({
    resolver: zodResolver(LoginUserSchema),
  });

  return (
    <section className="grid grid-rows-3 xl:grid-cols-2 xl:grid-rows-none">
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
          <p className="pb-4 font-normal leading-7 text-zinc-500">
            Log in to your existing account or{' '}
            <LinkCustom href="/register">sign up</LinkCustom> to get started
            with a league
          </p>
        </div>
        <Form {...form}>
          <form id="input-container" className="grid gap-4">
            <FormControl
              data-testid="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={handleEmail}
            />
            <FormControl
              data-testid="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePassword}
            />
            <Button
              data-testid="continue-button"
              label="Continue"
              disabled={!email && !password}
              onClick={() => loginAccount({ email, password })}
            />
            <LinkCustom href="/register">
              Sign up to get started with a league
            </LinkCustom>
          </form>
        </Form>
      </div>
    </section>
  );
}
