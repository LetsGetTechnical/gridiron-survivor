// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo/Logo';
import logo from '@/public/assets/logo-colored-outline.svg';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { useAuthContext } from '@/context/AuthContextProvider';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import { z } from 'zod';
import { Control, useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/Form/Form';
import { getMagicUrlToken } from '@/api/apiFunctions';

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

type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;

/**
 * Renders the login page.
 * @returns {JSX.Element} The rendered login page.
 */
const Login = (): JSX.Element => {
  const router = useRouter();
  const { loginAccount, isSignedIn } = useAuthContext();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/weeklyPicks');
    }
  }, [isSignedIn, router]);

  const form = useForm<LoginUserSchemaType>({
    resolver: zodResolver(LoginUserSchema),
  });

  const email = useWatch({
    control: form.control,
    name: 'email',
    defaultValue: '',
  });

  const password = useWatch({
    control: form.control,
    name: 'password',
    defaultValue: '',
  });

  /**
   * A function that handles form submission.
   * @param {LoginUserSchemaType} data - The data submitted in the form.
   * @returns {Promise<void>} A promise that resolves when the `loginAccount` function completes.
   */
  const onSubmit: SubmitHandler<LoginUserSchemaType> = async (data) => {
    await loginAccount(data);
  };

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
        {/* <Form {...form}>
          <form
            id="input-container"
            className="grid gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control as Control<object>}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      data-testid="email"
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control as Control<object>}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      data-testid="password"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.password && (
                    <FormMessage>
                      {form.formState.errors.password.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button
              data-testid="continue-button"
              label="Continue"
              type="submit"
              disabled={!email || !password}
            />
            <LinkCustom href="/register">
              Sign up to get started with a league
            </LinkCustom>
          </form>
        </Form> */}
        <button onClick={getMagicUrlToken}>Magic URL Test</button>
      </div>
    </section>
  );
};

export default Login;
