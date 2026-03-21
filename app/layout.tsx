import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

const SITE_URL = 'https://danielagbeni.uploaddoc.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Daniel Agbeni — Full-Stack & Mobile Software Developer',
    template: '%s | Daniel Agbeni',
  },

  description:
    'Daniel Agbeni is a full-stack and mobile software developer specializing in building production-grade web applications, mobile apps, and scalable cloud systems. Explore projects, skills, and services.',

  keywords: [
    'Daniel Agbeni',
    'software developer',
    'full-stack developer',
    'mobile developer',
    'web developer',
    'portfolio',
    'React',
    'Next.js',
    'Flutter',
    'cloud engineer',
    'Nigeria developer',
    'freelance developer',
  ],

  authors: [{ name: 'Daniel Agbeni', url: SITE_URL }],
  creator: 'Daniel Agbeni',
  publisher: 'Daniel Agbeni',

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
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Daniel Agbeni — Portfolio',
    title: 'Daniel Agbeni — Full-Stack & Mobile Software Developer',
    description:
      'Full-stack and mobile developer building production-grade web apps, mobile apps, and cloud systems. View projects, skills, and get in touch.',
    images: [
      {
        url: '/og-image.png',
        width: 1024,
        height: 819,
        alt: 'Daniel Agbeni — Software Developer',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@Agbeni_Daniel',
    creator: '@Agbeni_Daniel',
    title: 'Daniel Agbeni — Full-Stack & Mobile Software Developer',
    description:
      'Full-stack and mobile developer building production-grade web apps, mobile apps, and cloud systems.',
    images: ['/og-image.png'],
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',

  other: {
    'google-site-verification': '',           // fill in after Search Console setup
    'theme-color': '#4828e6',
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Daniel Agbeni',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  jobTitle: 'Full-Stack & Mobile Software Developer',
  description:
    'Full-stack and mobile software developer specializing in production-grade web and mobile applications.',
  email: 'danielagbeni@uploaddoc.app',
  sameAs: [
    'https://github.com/DanielAgbeni',
    'https://x.com/Agbeni_Daniel',
    'https://www.instagram.com/daniel_agbeni',
    'https://www.threads.com/@daniel_agbeni',
    'https://www.tiktok.com/@daniel_agbeni',
    'https://www.youtube.com/@daniel_agbeni',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${heading.variable} bg-background text-text`}>{children}</body>
    </html>
  );
}
