import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Daniel Agbeni | Full-Stack Portfolio',
  description: 'Production-grade full-stack and mobile engineering portfolio powered by Next.js and Convex.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${heading.variable} bg-background text-text`}>{children}</body>
    </html>
  );
}
