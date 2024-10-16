// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import Heading from '@/components/Heading/Heading';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import ResetPasswordForm from '@/components/RestPasswordForm/ResetPasswordForm';
import UpdateEmailForm from '@/components/UpdateEmailForm/UpdateEmailForm';
import { useAuthContext } from '@/context/AuthContextProvider';
import { ChevronLeft } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';

/**
 * Display user preferences
 * @returns {JSX.Element} The rendered user preferences component.
 */
const AccountSettings = (): JSX.Element => {
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const { isSignedIn } = useAuthContext();

  useEffect(() => {
    if (isSignedIn) {
      setLoadingData(false);
    }
  }, [isSignedIn]);

  return (
    <>
      {loadingData ? (
        <GlobalSpinner />
      ) : (
        <section className="mx-auto max-w-5xl pt-10">
          <header
            className="flex flex-col gap-4"
            data-testid="settings-page-header"
          >
            <div data-testid="link-to-all-leagues-page">
              <LinkCustom
                className="no-underline hover:underline text-primary flex gap-3 items-center font-semibold text-xl"
                href={`/league/all`}
              >
                <ChevronLeft />
                Your Leagues
              </LinkCustom>
            </div>
            <Heading
              as="h1"
              className="text-4xl font-bold"
              data-testid="entry-page-header-page-name"
            >
              Settings
            </Heading>
          </header>

          <div className="flex flex-col w-full pt-10 gap-8">
            <UpdateEmailForm />
            <ResetPasswordForm />
          </div>
        </section>
      )}
    </>
  );
};

export default AccountSettings;
