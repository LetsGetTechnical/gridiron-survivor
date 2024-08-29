// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { GeistSans } from 'geist/font/sans';
import '../globals.css';
import Nav from '@/components/Nav/Nav';
import { AuthContextProvider } from '@/context/AuthContextProvider';
import ErrorBoundary from '../error';
import { Toaster } from 'react-hot-toast';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'GridIron Survivor',
  description: 'Fantasy Football Survivor Pool',
};

/**
 * The root layout for the application.
 * @param props - The props
 * @param props.children - The children
 * @returns The rendered root layout.
 */
const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="dark:dark bg-background pb-8 px-4 text-foreground xl:pb-0">
        <ErrorBoundary>
          <AuthContextProvider>
            <Nav />
            <main>{children}</main>
            <Toaster />
          </AuthContextProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
