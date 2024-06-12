'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/Input/Input';
import Logo from '@/components/Logo/Logo';
import { Button } from '@/components/Button/Button';
import { registerAccount } from '@/api/apiFunctions';
import logo from '/public/assets/logo-colored-outline.svg';
import { useAuthContext } from '@/context/AuthContextProvider';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import { z } from 'zod';
import { useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/Form/Form';

const RegisterUserSchema = z
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

type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;

const Register = () => {
  const router = useRouter();
  const { loginAccount, isSignedIn } = useAuthContext();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/weeklyPicks');
    }
  }, [isSignedIn, router]);

  const form = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
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

  const confirmPassword = useWatch({
    control: form.control,
    name: 'confirmPassword',
    defaultValue: '',
  });

  const onSubmit: SubmitHandler<RegisterUserSchemaType> = async (data) => {
    console.log(data);
    try {
      await registerAccount(data);
      await loginAccount(data);
      router.push('/weeklyPicks');
    } catch (error) {
      console.error('Registration Failed', error);
    }
  };

  const isDisabled = !email || !password || password !== confirmPassword;

  return (
    <div className="h-screen w-full">
      <div className="grid h-screen w-full grid-cols-2 bg-gradient-to-b from-[#4E160E] to-zinc-950">
        <div className="grid p-8">
          <div className="grid">
            <Logo className="mx-auto place-self-end" src={logo} />
          </div>
          <div className="mx-auto grid gap-4 place-self-end">
            <p className="leading-7 text-white">
              Thank you... fantasy football draft, for letting me know that even
              in my fantasies, I am bad at sports.
            </p>
            <p className="leading-7 text-white">Jimmy Fallon</p>
          </div>
        </div>
        <div className="grid place-content-center bg-white p-8">
          <div className="mx-auto grid w-80 place-content-center gap-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
              Register A New Account
            </h1>
            <p className="pb-4 font-normal leading-7 text-zinc-500">
              If you have an existing account{' '}
              <LinkCustom href="/login">Login!</LinkCustom>
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  data-testid="continue-button"
                  label="Register"
                  type="submit"
                  disabled={isDisabled}
                />
                <LinkCustom href="/login">
                  Login to get started playing
                </LinkCustom>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
