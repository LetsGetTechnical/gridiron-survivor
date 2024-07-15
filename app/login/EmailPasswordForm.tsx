// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Control, useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/Form/Form';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { useAuthContext } from '@/context/AuthContextProvider';

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
 * Renders the email and password login form
 * @returns {JSX.Element} The rendered email and password login form.
 */
const EmailPasswordForm = () => {
  const { login } = useAuthContext();
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
   * @returns {Promise<void>} A promise that resolves when the `login` function completes.
   */
  const onSubmit: SubmitHandler<LoginUserSchemaType> = async (data) => {
    await login(data);
  };

  return (
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
                <FormMessage>{form.formState.errors.email.message}</FormMessage>
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
      </form>
    </Form>
  );
};

export default EmailPasswordForm;
