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
import { useAuthContext } from '@/context/AuthContextProvider';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import Logo from '@/components/Logo/Logo';
import logo from '@/public/assets/logo-colored-outline.svg';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { recoverPassword } from '@/api/apiFunctions';
import toast from 'react-hot-toast';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';

/**
 * The schema for the recover password form
 * @throws {Error} Throws an error if the email is not a valid email address.
 * @throws {Error} Throws an error if the email is not provided.
 * @throws {Error} Throws an error if the email is not a string.
 */
const RecoverUserPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter an email address' })
    .email({ message: 'Please enter a valid email address' }),
});

type ResetUserPasswordSchemaType = z.infer<typeof RecoverUserPasswordSchema>;

/**
 * Renders the recover password page.
 * @returns {React.JSX.Element} The rendered recover password page.
 */
const RecoverPassword = (): React.JSX.Element => {
  const router = useRouter();
  const { isSignedIn, getUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      getUser();
      router.push('/league/all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  const form = useForm<ResetUserPasswordSchemaType>({
    resolver: zodResolver(RecoverUserPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const email = useWatch({
    control: form.control,
    name: 'email',
    defaultValue: '',
  });

  /**
   * Handles the form submission.
   * @param {ResetUserPasswordSchemaType} data - The data from the form.
   */
  const onSubmit: SubmitHandler<ResetUserPasswordSchemaType> = async (data) => {
    setIsLoading(true);
    await recoverPassword(data);
    setIsLoading(false);
    toast.custom(
      <Alert
        variant={AlertVariants.Success}
        message={`If an account exists for ${data.email}, we've sent password reset instructions to that email address. Please check your inbox and follow the provided steps to reset your password.`}
      />,
    );
    setTimeout(() => router.push('/login'), 2000);
  };

  return (
    <section className="grid xl:grid-cols-2 xl:grid-rows-none">
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
            Password Recovery
          </h1>
          <p className="pb-4 font-normal leading-7 text-muted-foreground">
            Enter the email address associated with your account to recover your
            password.
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
            <Button
              data-testid="continue-button"
              label={isLoading ? <LoadingSpinner /> : 'Recover'}
              type="submit"
              disabled={!email || isLoading}
            />
            <LinkCustom href="/login">Return to Login</LinkCustom>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default RecoverPassword;
