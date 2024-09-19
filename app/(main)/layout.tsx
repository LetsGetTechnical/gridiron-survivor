// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import '../globals.css';
import { AuthContextProvider } from '@/context/AuthContextProvider';
import { GeistSans } from 'geist/font/sans';
import { MessageSquareShare } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '../error';
import Nav from '@/components/Nav/Nav';
import React, { JSX } from 'react';

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
              {children}
              <div className="pt-24">
                <a
                  className="bg-background border border-border text-primary rounded-full w-24 h-24 flex flex-col items-center justify-center fixed bottom-4 right-4 md:bottom-12 md:right-12  hover:bg-muted transition-colors duration-300 text-center text-xs font-bold"
                  href="https://docs.google.com/forms/d/1Nz-xfu3wxUPniiG0UpLxNkl3dIQi8N5dFeq4bQELhOQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquareShare className="w-10 h-10" />
                  Feedback
                </a>
              </div>
            </main>
            <Toaster />
          </AuthContextProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
