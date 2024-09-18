// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { updateUserEmail } from '@/api/apiFunctions';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useAuthContext } from '@/context/AuthContextProvider';
import { useDataStore } from '@/store/dataStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useEffect, useState } from 'react';
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

const UpdateEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter an email address' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Please enter a password' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type UpdateEmailSchemaType = z.infer<typeof UpdateEmailSchema>;

/**
 * Display update user email form
 * @returns {JSX.Element} The rendered update user email form.
 */
const UpdateEmailForm = (): JSX.Element => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { user, updateUser } = useDataStore((state) => state);
  const { isSignedIn } = useAuthContext();

  useEffect(() => {
    if (isSignedIn) {
      form.reset({ email: user.email || '', password: '' });
    }
  }, [isSignedIn, user]);

  const form = useForm<UpdateEmailSchemaType>({
    resolver: zodResolver(UpdateEmailSchema),
    defaultValues: {
      email: user.email || '',
      password: '',
    },
  });

  const email: string = useWatch({
    control: form.control,
    name: 'email',
    defaultValue: user.email || '',
  });

  const password: string = useWatch({
    control: form.control,
    name: 'password',
    defaultValue: '',
  });

  /**
   * A function that handles form submission.
   * @param {UpdateEmailSchemaType} data - The data submitted in the form.
   * @returns {Promise<void>} Promise that resolves after form submission is processed.
   */
  const onSubmit: SubmitHandler<UpdateEmailSchemaType> = async (
    data: UpdateEmailSchemaType,
  ): Promise<void> => {
    const { email, password } = data;
    setIsUpdating(true);
    try {
      await updateUserEmail({
        email,
        password,
      });

      toast.custom(
        <Alert
          variant={AlertVariants.Success}
          message="You have successfully updated your email."
        />,
      );

      updateUser(user.documentId, user.id, email, user.leagues);

      form.reset({ email: user.email || '', password: '' });
    } catch (error) {
      console.error('Email Update Failed', error);
      toast.custom(
        <Alert variant={AlertVariants.Error} message="Email Update Failed!" />,
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const isDisabled = email === user.email || !email || isUpdating || !password;

  return (
    <Form {...form}>
      <form
        id="input-container"
        className="border border-border rounded-lg w-full bg-border/40"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-start mb-4 border-b border-border pb-4">
          <span className="w-1/2 pl-4 pt-4 align-top">Email</span>
          <div className="flex flex-col gap-4 w-2/4 pr-4 pt-4">
            <FormField
              control={form.control as Control<object>}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="border-none px-0 py-0 pb-1 pl-1">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      data-testid="email"
                      type="email"
                      placeholder="Email"
                      className="w-full"
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
                  <FormLabel className="border-none px-0 py-0 pb-1 pl-1">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      data-testid="password"
                      type="password"
                      placeholder="Enter Password"
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
          </div>
        </div>
        <div className="flex justify-end pb-4 pr-4">
          <Button
            data-testid="updated-email-button"
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

export default UpdateEmailForm;