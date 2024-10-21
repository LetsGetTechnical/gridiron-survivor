// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { Button } from '@/components/Button/Button';
import { Control, useForm, useWatch, SubmitHandler } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/Form/Form';
import { Input } from '@/components/Input/Input';
import { registerAccount } from '@/api/apiFunctions';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@/components/AlertNotification/AlertNotification';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import Logo from '@/components/Logo/Logo';
import logo from '/public/assets/logo-colored-outline.svg';
import React, { JSX, useEffect, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

const RegisterUserSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Please enter an email address' })
      .email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(1, { message: 'Please enter a password' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' })
      .min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;

/**
 * Renders the registration page.
 * @returns {JSX.Element} The rendered registration page.
 */
const Register = (): JSX.Element => {
  const router = useRouter();
  const { login, isSignedIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      router.push('/league/all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  const form = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
  });

  /**
   * The current value of the 'email' field in the form.
   * @type {string}
   */
  const email: string = useWatch({
    control: form.control,
    name: 'email',
    defaultValue: '',
  });

  /**
   * The current value of the 'password' field in the form.
   * @type {string}
   */
  const password: string = useWatch({
    control: form.control,
    name: 'password',
    defaultValue: '',
  });

  /**
   * The current value of the 'confirmPassword' field in the form.
   * @type {string}
   */
  const confirmPassword: string = useWatch({
    control: form.control,
    name: 'confirmPassword',
    defaultValue: '',
  });

  /**
   * A function that handles form submission.
   * @param {RegisterUserSchemaType} data - The data submitted in the form.
   * @returns {Promise<void>} Promise that resolves after form submission is processed.
   */
  const onSubmit: SubmitHandler<RegisterUserSchemaType> = async (
    data: RegisterUserSchemaType,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      await registerAccount(data);
      await login(data);
      toast.custom(
        <Alert
          variant={AlertVariants.Success}
          message="You have successfully registered your account."
        />,
      );
    } catch (error) {
      console.error('Registration Failed', error);
      toast.custom(
        <Alert variant={AlertVariants.Error} message="Something went wrong!" />,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !email || !password || password !== confirmPassword;

  return (
    <section className="grid xl:grid-cols-2 xl:grid-rows-none">
      <div
        data-testid="dark-mode-section"
        className="row-span-1 grid w-full place-items-center from-[#4E160E] to-zinc-950 bg-gradient-to-b xl:h-screen xl:bg-gradient-to-b"
      >
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
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
            Register A New Account
          </h1>
          <p className="pb-4 font-normal leading-7 text-muted-foreground">
            If you have an existing account{' '}
            <LinkCustom href="/login">Login!</LinkCustom>
          </p>
        </div>

        <Form {...form}>
          <form
            id="input-container"
            className="grid gap-3"
            data-testid="register-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control as Control<object>}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="border-none px-0 py-0 pb-2 pl-1">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      data-testid="email"
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors?.email && (
                    <FormMessage>
                      {form.formState.errors?.email.message}
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
                  <FormLabel className="border-none px-0 py-0 pb-2 pl-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      data-testid="password"
                      type="password"
                      placeholder="Enter your password"
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
            <FormField
              control={form.control as Control<object>}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="border-none px-0 py-0 pb-2 pl-1">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      data-testid="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors?.confirmPassword && (
                    <FormMessage>
                      {form.formState.errors?.confirmPassword.message}
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
              disabled={isDisabled}
            />
            <LinkCustom href="/login">Login to get started playing</LinkCustom>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Register;