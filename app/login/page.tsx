import Link from 'next/link';
import { redirect } from 'next/navigation';
import Logo from '@/components/logo/Logo';
import logo from '/public/assets/logo-colored-outline.svg';
import { Input } from '@/components/input/Input';
import { Button } from '@/components/Button/Button';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
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
              Join Gridiron Survivor
            </h1>
            <p className="pb-4 font-normal leading-7 text-zinc-500">
              Log in to your existing account or sign up to get started with a
              league
            </p>
            <Input placeholder="Email" />
            <Button label="Continue" />
          </div>
        </div>
      </div>
    </div>
  );
}
