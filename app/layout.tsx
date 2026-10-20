import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { allSkills } from '@/lib/resume';
import { SITE_URL, site } from '@/lib/site';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const defaultTitle = `${site.name} — ${site.role} (Next.js, React Native, Node.js)`;
const defaultDescription =
  'Portfolio of Daniel Agbeni Oluwafemi, a Full-Stack Software Developer building production web and mobile apps with TypeScript, Next.js, React Native, Node.js, PostgreSQL, MongoDB, Redis and PyTorch Geometric.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.fullName, url: SITE_URL }],
  creator: site.fullName,
  publisher: site.fullName,
  category: 'technology',
  keywords: [
    site.name,
    site.fullName,
    'Full-Stack Software Developer',
    'Full-Stack Engineer',
    'React Native Developer',
    'Next.js Developer',
    'TypeScript Engineer',
    'Node.js Backend Developer',
    'Software Developer Nigeria',
    'Remote Full-Stack Developer',
    'GARRO Graph Attention Routing',
    'UploadDoc',
    'JLance',
    'Buabed Banafa Perfumes',
    ...allSkills,
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: SITE_URL,
    siteName: `${site.name} — ${site.role}`,
    title: defaultTitle,
    description: defaultDescription,
    firstName: site.givenName,
    lastName: site.familyName,
    username: 'DanielAgbeni',
  },
  twitter: {
    card: 'summary_large_image',
    site: site.twitterHandle,
    creator: site.twitterHandle,
    title: defaultTitle,
    description: defaultDescription,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className=" flex min-h-[100dvh] flex-col bg-bg font-sans text-fg antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-fg focus:shadow-lift"
          >
            Skip to main content
          </a>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
