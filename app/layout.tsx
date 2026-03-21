import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SYS_ARCHITECT_v1.0 // Daniel Portfolio',
  description: 'Daniel Agbeni portfolio with Convex powered admin CMS.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
