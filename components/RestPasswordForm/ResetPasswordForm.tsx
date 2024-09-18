// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { resetPassword } from '@/api/apiFunctions';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useState } from 'react';
import { Control, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form/Form';
import { useAuthContext } from '@/context/AuthContextProvider';

const ResetPasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: 'Please enter your old password' }),
  newPassword: z
    .string()
    .min(1, { message: 'Please enter your new password' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

/**
 * Display update user email form
 * @returns {JSX.Element} The rendered update user email form.
 */
const ResetPasswordForm = (): JSX.Element => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { logoutAccount } = useAuthContext();

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const oldPassword: string = useWatch({
    control: form.control,
    name: 'oldPassword',
    defaultValue: '',
  });

  const newPassword: string = useWatch({
    control: form.control,
    name: 'newPassword',
    defaultValue: '',
  });

  /**
   * A function that handles form submission.
   * @param {ResetPasswordSchemaType} data - The data submitted in the form.
   * @returns {Promise<void>} Promise that resolves after form submission is processed.
   */
  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (
    data: ResetPasswordSchemaType,
  ): Promise<void> => {
    const { oldPassword, newPassword } = data;
    setIsUpdating(true);
    try {
      await resetPassword({
        newPassword,
        oldPassword,
      });
      toast.custom(
        <Alert
          variant={AlertVariants.Success}
          message="You have successfully updated your password."
        />,
      );

      form.reset({ oldPassword: '', newPassword: '' });
    } catch (error) {
      console.error('Email Update Failed', error);
      toast.custom(
        <Alert variant={AlertVariants.Error} message="Email Update Failed!" />,
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const isDisabled = oldPassword === '' || newPassword === '' || isUpdating;

  return (
    <Form {...form}>
      <form
        id="input-container"
        className="border border-border rounded-lg w-full bg-border/40"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-start mb-4 border-b border-border pb-4">
          <div className="flex flex-col gap-4 w-1/2 pl-4 pt-4 align-top">
            Password
            <span className="flex gap-1 text-sm">
              Forgot your password?
              <a
                href="/recover-password"
                className="underline underline-offset-4 hover:text-primary-muted transition-colors"
                data-testid="recover-password-link"
                onClick={() => {
                  logoutAccount();
                }}
              >
                Recover your password
              </a>
            </span>
          </div>
          <div className="flex flex-col gap-4 w-2/4 pr-4 pt-4">
            <FormField
              control={form.control as Control<object>}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="border-none px-0 py-0 pb-1 pl-1">
                    Old Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      data-testid="old-password"
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.oldPassword && (
                    <FormMessage>
                      {form.formState.errors.oldPassword.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control as Control<object>}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="border-none px-0 py-0 pb-1 pl-1">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      data-testid="new-password"
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.newPassword && (
                    <FormMessage>
                      {form.formState.errors.newPassword.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end pb-4 pr-4">
          <Button
            data-testid="updated-password-button"
            type="submit"
            disabled={isDisabled}
            className="w-[100px]"
          >
            {isUpdating ? <LoadingSpinner /> : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
