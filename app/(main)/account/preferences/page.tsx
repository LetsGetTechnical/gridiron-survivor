// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import Heading from '@/components/Heading/Heading';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import { useAuthContext } from '@/context/AuthContextProvider';
import { useDataStore } from '@/store/dataStore';
import { ChevronLeft } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';
import { z } from 'zod';
import { Control, useForm, useWatch, SubmitHandler } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/Form/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import toast from 'react-hot-toast';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { Label } from '@/components/Label/Label';

const UserPreferencesSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Please enter an email address' })
      .email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(1, { message: 'Please enter a password' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' })
      .min(6, { message: 'Password must be at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type UserPreferencesSchemaType = z.infer<typeof UserPreferencesSchema>;

/**
 * Display user preferences
 * @returns {JSX.Element} The rendered user preferences component.
 */
const AccountPreferences = (): JSX.Element => {
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const { user } = useDataStore((state) => state);
  const { isSignedIn } = useAuthContext();

  useEffect(() => {
    if (isSignedIn) {
      setLoadingData(false);
    }
  }, [isSignedIn]);

  const form = useForm<UserPreferencesSchemaType>({
    resolver: zodResolver(UserPreferencesSchema),
    defaultValues: {
      email: user.email,
      password: '',
      confirmPassword: '',
    },
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
  const onSubmit: SubmitHandler<UserPreferencesSchemaType> = async (
    data: UserPreferencesSchemaType,
  ): Promise<void> => {
    try {
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
    }
  };

  const isDisabled = !email || !password || password !== confirmPassword;

  return (
    <>
      {loadingData ? (
        <GlobalSpinner />
      ) : (
        <div className="mx-auto max-w-3xl pt-10 flex flex-col items-center">
          <header data-testid="entry-page-header">
            <div data-testid="entry-page-header-to-leagues-link">
              <LinkCustom
                className="no-underline hover:underline text-primary flex gap-3 items-center font-semibold text-xl"
                href={`/league/all`}
              >
                <ChevronLeft />
                Your Leagues
              </LinkCustom>
            </div>
            <div
              className="entry-page-header-main flex flex-col justify-between text-center gap-10 pt-6 pb-4"
              data-testid="entry-page-header-main"
            >
              <div className="entry-page-header-league-name-and-survivors flex flex-col gap-3">
                <Heading
                  as="h2"
                  className="text-4xl font-bold"
                  data-testid="entry-page-header-league-name"
                >
                  Account Preferences
                </Heading>
              </div>
            </div>
          </header>

          <section className="flex flex-col w-1/2">
            <Form {...form}>
              <form
                id="input-container"
                className="grid gap-10 mt-4 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control as Control<object>}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="border-0 py-2 px-0">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          data-testid="email"
                          type="email"
                          placeholder="Email"
                          {...field}
                          value={user.email}
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
                <section className="flex flex-col gap-2">
                  <FormField
                    control={form.control as Control<object>}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="border-0 py-2 px-0">
                          Password
                        </FormLabel>
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
                    data-testid="update-preferences-button"
                    label="Update Preferences"
                    type="submit"
                    disabled={isDisabled}
                    className="mt-4"
                  />
                </section>
              </form>
            </Form>
          </section>
        </div>
      )}
    </>
  );
};

export default AccountPreferences;
