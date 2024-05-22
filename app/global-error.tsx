'use client'; // Error components must be Client Components
import { Button } from '@/components/Button/Button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="align-center flex flex-col">
      <h2 className="text-white">Something went wrong!</h2>
      <Button label="Try Again" onClick={() => reset()} />
    </div>
  );
}