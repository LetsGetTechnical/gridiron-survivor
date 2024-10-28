// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import React, { useEffect, JSX } from 'react';
import { useAuthContext } from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';
import Heading from '@/components/Heading/Heading';

/**
 * Renders the logout page.
 * @returns {React.JSX.Element} The rendered logout page.
 */
const Logout = (): JSX.Element => {
  const { logoutAccount } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    /**
     * Handles the logout.
     * @returns {Promise<void>} The logout promise.
     */
    const handleLogout = async (): Promise<void> => {
      try {
        await logoutAccount();
        router.push('/login');
      } catch (error) {
        throw error;
      }
    };

    handleLogout();
  }, [logoutAccount, router]);

  return (
    <>
      <section className="mx-auto max-w-5xl pt-10 text-center relative">
        <div className="absolute top-0">
          <Heading as="h2" className="text-2xl font-semibold mb-2">
            Logging Out
          </Heading>
          <p className="text-muted-foreground">
            Please wait while we securely log you out of your account...
          </p>
        </div>
        <GlobalSpinner />
      </section>
    </>
  );
};

export default Logout;
