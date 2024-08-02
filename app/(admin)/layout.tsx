// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import '../globals.css';
import { AuthContextProvider } from '@/context/AuthContextProvider';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '../error';
import React, { JSX } from 'react';
import Link from 'next/link';
import LogoNav from '@/components/LogoNav/LogoNav';
import Heading from '@/components/Heading/Heading';
import { LucideChevronsUpDown } from 'lucide-react';

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
      <body className="dark:dark bg-background text-foreground">
        <ErrorBoundary>
          <AuthContextProvider>
            <main className="h-screen">
              <section className="h-screen">
                <section className="w-1/5 border-r-2 border-border">
                  <div className="px-2">
                    <LogoNav />
                  </div>
                  <nav className="px-2">
                    <ul>
                      <li>
                        <Link href="#">Home</Link>
                      </li>
                      <li>
                        <Link href="#">Leauges</Link>
                      </li>
                      <li>
                        <Link href="#">Players</Link>
                      </li>
                      <li>
                        <Link href="#">Notifications</Link>
                      </li>
                    </ul>
                    <div className="flex gap-2 px-2 py-2 items-center outline outline-border rounded">
                      <span className="bg-cyan-500 w-8 h-8 rounded-full" />
                      <p>Users Name</p>
                      <LucideChevronsUpDown
                        className="ml-auto text-zinc-300"
                        size={16}
                      />
                    </div>
                  </nav>
                </section>
                <section>
                  <section>Admin Home 3</section>
                  <header className="pb-8">
                    <Heading as="h2">Admin Home 4</Heading>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Labore cumque tempora laborum velit perferendis tenetur.
                    </p>
                  </header>
                  {children}
                </section>
              </section>
            </main>
            <Toaster />
          </AuthContextProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
