// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';
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
import { createMagicURLToken } from '@/api/apiFunctions';

const LoginUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter an email address' })
    .email({ message: 'Please enter a valid email address' }),
});

type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;

/**
 * Renders the Magic URL login form
 * @returns {JSX.Element} - The rendered Magic URL login form.
 */
const MagicURLForm = (): JSX.Element => {
  const form = useForm<LoginUserSchemaType>({
    resolver: zodResolver(LoginUserSchema),
  });

  const email = useWatch({
    control: form.control,
    name: 'email',
    defaultValue: '',
  });

  /**
   * A function that handles form submission.
   * @param {LoginUserSchemaType} data - The data submitted in the form.
   * @returns {Promise<void>} A promise that resolves when the `login` function completes.
   */
  const onSubmit: SubmitHandler<LoginUserSchemaType> = async (data) => {
    createMagicURLToken(data.email);
    
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
        <Button
          data-testid="continue-button"
          label="Continue"
          type="submit"
          disabled={!email}
        />
      </form>
    </Form>
  );
};

export default MagicURLForm;
