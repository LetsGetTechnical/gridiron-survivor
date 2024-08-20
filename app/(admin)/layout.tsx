// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import '../globals.css';
import { AdminHeader } from '@/components/AdminHeader/AdminHeader';
import { AdminLogo } from '@/components/AdminLogo/AdminLogo';
import { AdminNav } from '@/components/AdminNav/AdminNav';
import { AdminQuickMenu } from '@/components/AdminQuickMenu/AdminQuickMenu';
import { AuthContextProvider } from '@/context/AuthContextProvider';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/app/error';
import React from 'react';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'GridIron Survivor',
  description: 'Fantasy Football Survivor Pool',
};

/**
 * The root layout for the admin pages.
 * @param props - The props
 * @param props.children - The children
 * @returns The rendered root layout.
 */
const AdminRootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return (
    <html lang="en">
      <body className="dark:dark bg-background text-foreground h-screen">
        <ErrorBoundary>
          <AuthContextProvider>
            <div className="admin-body-inner-container grid grid-cols-adminLayout h-full">
              <section className="left-column grid grid-rows-adminLayout border-r-2 border-border">
                <AdminLogo />
                <AdminNav />
              </section>
              <section className="right-column grid grid-rows-adminLayout content-start">
                <AdminQuickMenu />
                <AdminHeader />
                <main className="mx-6 max-w-screen-xl">{children}</main>
              </section>
            </div>
            <Toaster />
          </AuthContextProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default AdminRootLayout;
