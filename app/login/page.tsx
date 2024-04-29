import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <h1 className="text-center text-2xl font-bold text-foreground">
        Hello GIS
      </h1>
    </div>
  );
}
