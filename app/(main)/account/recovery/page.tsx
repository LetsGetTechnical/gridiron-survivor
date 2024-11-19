// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { resetRecoveredPassword } from '@/api/apiFunctions';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import Logo from '@/components/Logo/Logo';
import { useAuthContext } from '@/context/AuthContextProvider';
import logo from '@/public/assets/logo-colored-outline.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Control, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../../../components/Form/Form';
import { Suspense } from 'react';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';

/**
 * The schema for the login form.
 * @throws {Error} Throws an error if the email is not a valid email address.
 * @throws {Error} Throws an error if the email is not provided.
 * @throws {Error} Throws an error if the email is not a string.
 */
const ResetPasswordSchema = z
  .object({
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

type ResetUserPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

/**
 * Renders the recover password page.
 * @returns {React.JSX.Element} The rendered login page.
 */
const ResetPassword = (): React.JSX.Element => {
  const router = useRouter();
  const { isSignedIn, getUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let userId: string | null = null;
  let secret: string | null = null;
  let expire: string | null = null;

  /**
   * Wrapper component to handle search params
   * @returns {null} - null
   */
  const SearchParamsWrapper = (): null => {
    const searchParams = useSearchParams();
    userId = searchParams.get('userId');
    secret = searchParams.get('secret');
    expire = searchParams.get('expire');

    useEffect(() => {
      if (!userId || !secret || !expire) {
        router.push('/login');
        return;
      }

      setIsLoading(false);

      if (isSignedIn) {
        getUser();
        router.push('/league/all');
      }
    }, [isSignedIn]);

    return null;
  };

  const form = useForm<ResetUserPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  /**
   * The current value of the 'password' field in the form.
   * @type {string}
   */
  const password: string = useWatch({
    control: form.control,
    name: 'password',
  });

  /**
   * The current value of the 'confirmPassword' field in the form.
   * @type {string}
   */
  const confirmPassword: string = useWatch({
    control: form.control,
    name: 'confirmPassword',
  });

  /**
   * Handles the form submission.
   * @param data - The data from the form.
   */
  const onSubmit: SubmitHandler<ResetUserPasswordSchemaType> = async (data) => {
    const { password } = data;
    setIsSubmitting(true);

    try {
      await resetRecoveredPassword({
        userId: userId as string,
        token: secret as string,
        password,
      });

      toast.custom(
        <Alert
          variant={AlertVariants.Success}
          message="Your password has been reset successfully! Please login with your new password."
        />,
      );

      router.push('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      let errorMessage = 'There was an error resetting your password.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.custom(
        <Alert variant={AlertVariants.Error} message={errorMessage} />,
      );

      router.push('/recover-password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = !password || password !== confirmPassword;

  return (
    <section className="grid xl:grid-cols-2 xl:grid-rows-none">
      <Suspense fallback={<GlobalSpinner />}>
        <SearchParamsWrapper />
      </Suspense>

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
        {!isLoading && (
          <>
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight">
                Reset Password
              </h1>
              <p className="pb-4 font-normal leading-7 text-muted-foreground">
                Enter your new password and confirm it to recover your account.
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
                <FormField
                  control={form.control as Control<object>}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-testid="confirm-password"
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.confirmPassword && (
                        <FormMessage>
                          {form.formState.errors.confirmPassword.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  data-testid="reset-password-button"
                  label={isSubmitting ? <LoadingSpinner /> : 'Reset Password'}
                  type="submit"
                  disabled={isDisabled}
                />
              </form>
            </Form>
          </>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
