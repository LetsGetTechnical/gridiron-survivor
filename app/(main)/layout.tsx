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
      <body className="dark bg-background pb-8 px-4 text-foreground xl:pb-0">
        <ErrorBoundary>
          <AuthContextProvider>
            <Nav />
            <main>
              <div className="bg-gradient-to-b from-primary to-orange-400 w-fit mx-auto my-12 rounded-lg text-center p-1 drop-shadow-[0_2px_24px_rgba(234,88,12,0.65)] hover:drop-shadow-[0_2px_24px_rgba(234,88,12,0.95)] transition-all duration-500">
                <div className="bg-muted p-4 rounded-[calc(.5rem-2px)]">
                  <p className="text-foreground text-lg">
                    <a
                      className="font-bold underline hover:text-primary"
                      href="https://docs.google.com/forms/d/1Nz-xfu3wxUPniiG0UpLxNkl3dIQi8N5dFeq4bQELhOQ"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Provide feedback
                    </a>{' '}
                    to help make Gridiron Survivor even better!
                  </p>
                </div>
              </div>
              {children}
            </main>
            <Toaster />
          </AuthContextProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
