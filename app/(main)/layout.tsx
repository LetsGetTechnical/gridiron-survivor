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
              <div>
                <a
                  className="bg-transparent border border-border text-primary rounded-full w-12 h-2 flex items-center justify-center fixed bottom-4 right-4 md:bottom-12 md:right-12 md:w-20 md:h-20 hover:bg-muted transition-colors duration-300"
                  href="https://docs.google.com/forms/d/1Nz-xfu3wxUPniiG0UpLxNkl3dIQi8N5dFeq4bQELhOQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquareShare className="md:w-9 md:h-9" />
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
