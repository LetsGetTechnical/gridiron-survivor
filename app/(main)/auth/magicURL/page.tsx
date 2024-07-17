// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { JSX, useEffect } from 'react';
import { createSessionFromMagicURLToken } from '@/api/apiFunctions';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Renders the Magic URL page.
 * @returns {JSX.Element} - The rendered Magic URL page.
 */
const Page = (): JSX.Element => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // get the user id and secret from the search params
  const userId = searchParams.get('userId') as string;
  const secret = searchParams.get('secret') as string;

  /**
   * Creates a session from the magic URL token.
   * @returns {Promise<void>} A promise that resolves when the session is created.
   */
  const createSession = async (): Promise<void> => {
    await createSessionFromMagicURLToken({ userId, secret });
    router.push('/league/all');
  };

  useEffect(() => {
    createSession();
  }, []);

  return <div>Logging in...</div>;
};

export default Page;
