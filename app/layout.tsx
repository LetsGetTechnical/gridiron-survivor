import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Nav from '@/components/Nav/Nav';
import { AuthContextProvider } from '@/context/AuthContextProvider';
import ErrorBoundary from "./error"
import { Toaster } from 'react-hot-toast';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'GridIron Survivor',
  description: 'Fantasy Football Survivor Pool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="dark:dark bg-background px-4 pb-8 text-foreground">
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
}
