import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Nav from '@/components/Nav/Nav';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Appwrite',
  description: 'The fastest way to build apps with Next.js and Appwrite',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="text-foreground">
        <Nav />
        <main className="flex min-h-screen flex-col items-center bg-[#09090B]">
          {children}
        </main>
      </body>
    </html>
  );
}
