// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { Button } from '@/components/Button/Button';
import { Control, useForm, useWatch, SubmitHandler } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../../components/Form/Form';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import { Input } from '@/components/Input/Input';
import { useAuthContext } from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import Logo from '@/components/Logo/Logo';
import logo from '@/public/assets/logo-colored-outline.svg';
import React, { useEffect, useState } from 'react';

/**
 * The schema for the login form.
 * @type {z.ZodObject} The schema for the login form.
 * @property {z.ZodString} email - The email address of the user.
 * @property {z.ZodString} password - The password of the user.
 * @returns {z.ZodObject} The schema for the login form.
 * @throws {Error} Throws an error if the email is not a valid email address or if the password is less than 6 characters.
 * @throws {Error} Throws an error if the email is not provided or if the password is not provided.
 * @throws {Error} Throws an error if the email is not a string or if the password is not a string.
 */
const LoginUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter an email address' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Please enter a password' })
    .min(8, { message: 'Password must be at least 8 characters' }),
});

type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;

/**
 * Renders the login page.
 * @returns {React.JSX.Element} The rendered login page.
 */
const Login = (): React.JSX.Element => {
  const router = useRouter();
  const { login, getUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkAuth, setCheckAuth] = useState<boolean>(true);

  useEffect(() => {
    async function checkSignedIn() {
      const userSignedIn = await getUser();
      if (userSignedIn) {
        router.push('/league/all');
      }
      else {
        setCheckAuth(false);
      }
    }

    checkSignedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
   * Handles the form submission.
   * @param {LoginUserSchemaType} data - The data from the form.
   */
  const onSubmit: SubmitHandler<LoginUserSchemaType> = async (
    data: LoginUserSchemaType,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      await login(data);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('An error occurred while logging in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`grid xl:${checkAuth ? '' : 'grid-cols-2'} xl:grid-rows-none`}>
      {checkAuth ? (
        <GlobalSpinner data-testid="global-spinner" />) : (
      <>
        <div className="row-span-1 grid w-full place-items-center from-[#4E160E] to-zinc-950 bg-gradient-to-b xl:h-screen xl:bg-gradient-to-b">
          <Logo className="mx-auto w-52 xl:w-64 xl:place-self-end" src={logo} />
          <div className="mx-auto grid gap-4 place-self-end px-8 pb-8 text-foreground">
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
            <p className="pb-4 font-normal leading-7 text-muted-foreground">
              Log in to your existing account or{' '}
              <LinkCustom href="/register">sign up</LinkCustom> to get started
              with a league
            </p>
          </div>
          <Form {...form}>
            <form
              id="input-container"
              className="grid gap-3"
              data-testid="login-form"
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
                    {form.formState.errors?.email && (
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
                    {form.formState.errors?.password && (
                      <FormMessage>
                        {form.formState.errors?.password.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button
                data-testid="continue-button"
                label={
                  isLoading ? (
                    <LoadingSpinner data-testid="loading-spinner" />
                  ) : (
                    'Continue'
                  )
                }
                type="submit"
                disabled={!email || !password || isLoading}
              />
              <LinkCustom href="/register">
                Sign up to get started with a league
              </LinkCustom>
              <LinkCustom href="/recover-password">
                Forgot your password?
              </LinkCustom>
            </form>
          </Form>
        </div>
      </>
        )}
    </section>
  );
};

export default Login;
