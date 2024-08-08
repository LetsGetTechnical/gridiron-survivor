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
import {
  LucideChevronsUpDown,
  LucideHome,
  LucideLayoutGrid,
  LucideUsers,
  LucideBell,
  LucideCog,
} from 'lucide-react';

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
            <main className="grid grid-cols-adminLayout h-screen">
              <section className="left-column grid grid-rows-adminLayout h-full border-r-2 border-border">
                <section className="flex items-center border-b-2 border-border px-3">
                  <LogoNav />
                </section>
                <section className="nav-sidebar">
                  <nav className="flex flex-col justify-between h-full pt-2 pb-3 px-3 text-sm text-zinc-400">
                    <ul className="flex flex-col gap-y-2">
                      <li>
                        <Link
                          href="#"
                          className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
                        >
                          <LucideHome className="w-4 h-4" />
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
                        >
                          <LucideLayoutGrid className="w-4 h-4" />
                          Leauges
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
                        >
                          <LucideUsers className="w-4 h-4" />
                          Players
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
                        >
                          <LucideBell className="w-4 h-4" />
                          Notifications
                        </Link>
                      </li>
                    </ul>
                    <div className="flex gap-2 px-2 py-2 items-center outline outline-border rounded text-zinc-50">
                      <span className="bg-cyan-500 w-8 h-8 rounded-full" />
                      <p>Users Name</p>
                      <LucideChevronsUpDown
                        className="ml-auto text-zinc-300"
                        size={16}
                      />
                    </div>
                  </nav>
                </section>
              </section>
              <section className="right-column grid grid-rows-adminLayout">
                <section className="flex items-center border-b-2 border-border px-6">
                  <div className="flex gap-2 px-2 py-2 items-center outline outline-border rounded w-80">
                    <LucideCog className="w-8 h-8 p-1 bg-zinc-700" />
                    <p>Admin</p>
                    <LucideChevronsUpDown
                      className="ml-auto text-zinc-300"
                      size={16}
                    />
                  </div>
                </section>
                <section>
                  <header className="pt-6 px-6 pb-8 space-y-2">
                    <Heading as="h2">Admin Home</Heading>
                    <p className="text-zinc-400 max-w-prose">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Labore cumque tempora laborum velit perferendis tenetur.
                    </p>
                  </header>
                  <section className="px-6">{children}</section>
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
