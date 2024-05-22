import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Nav from '@/components/Nav/Nav';
import { AuthContextProvider } from '@/context/AuthContextProvider';
import ErrorBoundary from './errorBoundary';

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
      <body className="text-foreground">
        <ErrorBoundary>
          <AuthContextProvider>
            <Nav />
            <main className="flex min-h-screen flex-col items-center bg-[#09090B]">
              {children}
            </main>
          </AuthContextProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
