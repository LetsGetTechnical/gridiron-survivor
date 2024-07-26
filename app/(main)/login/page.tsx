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
import { Input } from '@/components/Input/Input';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContextProvider';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import Logo from '@/components/Logo/Logo';
import logo from '@/public/assets/logo-colored-outline.svg';
import router from 'next/router';

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
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;

/**
 * Renders the login page.
 * @returns {React.JSX.Element} The rendered login page.
 */
const Login = (): React.JSX.Element => {
  const { login, isSignedIn, getUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      getUser();
      router.push('/league/all');
    }
  }, [isSignedIn, getUser]);

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
  const onSubmit: SubmitHandler<LoginUserSchemaType> = async (data) => {
    setIsLoading(true);
    await login(data);
    setIsLoading(false);
  };

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
          <p className="pb-4 font-normal leading-7 text-zinc-500">
            Log in to your existing account or{' '}
            <LinkCustom href="/register">sign up</LinkCustom> to get started
            with a league
          </p>
        </div>
        <Form {...form}>
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
              label={isLoading ? <LoadingSpinner /> : 'Continue'}
              type="submit"
              disabled={!email || !password || isLoading}
            />
            <LinkCustom href="/register">
              Sign up to get started with a league
            </LinkCustom>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Login;
