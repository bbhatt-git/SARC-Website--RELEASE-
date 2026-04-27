
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { Inter_Tight } from 'next/font/google';
import { ThemeProvider } from './components/theme-provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AnimationProvider from './components/AnimationProvider';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter-tight',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sarc.edu.np'),
  title: {
    template: '%s | SARC Education Foundation',
    default: 'SARC Education Foundation | Pioneering Futures in Nepal',
  },
  description: "SARC in Bhimdatta, Kanchanpur offers top +2 Science, Management, and Law programs. We're dedicated to nurturing Nepal's future leaders with excellence.",
  keywords: ['SARC', 'SARC Education', 'Education in Nepal', 'Kanchanpur College', 'Bhimdatta College', '+2 Science', '+2 Management', '+2 Law', 'CTEVT', 'Bridge Course', 'Far-West Nepal Education'],
  authors: [{ name: 'SARC Education Foundation' }],
  creator: 'SARC Education Foundation',
  publisher: 'SARC Education Foundation',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SARC Education Foundation | Pioneering Futures',
    description: "SARC in Bhimdatta, Kanchanpur offers top +2 Science, Management, and Law programs. We're dedicated to nurturing Nepal's future leaders with excellence.",
    url: 'https://sarc.edu.np',
    siteName: 'SARC Education Foundation',
    images: [
      {
        url: '/images/sarc.png',
        width: 1200,
        height: 630,
        alt: 'SARC Education Foundation Campus',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SARC Education Foundation | Pioneering Futures',
    description: 'Join SARC in Bhimdatta, Kanchanpur for a holistic education. Discover our +2 programs in Science, Management, and Law.',
    images: ['/images/sarc.png'],
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
  icons: {
    icon: '/images/sarc.png',
    apple: '/images/sarc.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "name": "SARC Education Foundation",
  "url": "https://sarc.edu.np",
  "logo": "https://sarc.edu.np/images/sarc.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+977-99-525271",
    "contactType": "Customer Service",
    "areaServed": "NP",
    "availableLanguage": "en"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bhimdatta-06",
    "addressLocality": "Mahendranagar",
    "addressRegion": "Kanchanpur",
    "addressCountry": "NP"
  },
  "sameAs": [
    "https://www.facebook.com/sarc.edu.np",
    "https://instagram.com/sarc.edu.np",
    "https://github.com/sarceducationfoundation"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(interTight.variable)} suppressHydrationWarning>
      <body id="app-root" className="min-h-screen flex flex-col w-full relative overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <Header />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <Toaster />
          <AnimationProvider />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
