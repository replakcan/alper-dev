import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Footer from './components/Footer'
import Header from './components/Header'
import IntroGate from './components/IntroGate'
import MainWrapper from './components/MainWrapper'
import SmoothScroll from './components/SmoothScroll'
import { INTRO_STORAGE_KEY } from './intro'
import './globals.css'
import styles from './layout.module.css'
import 'lenis/dist/lenis.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://alper.dev'),
  title: {
    default: 'Alper — Software Engineer',
    template: '%s · Alper',
  },
  description: 'Selected software projects, engineering notes, and thoughtful interface experiments from Alper.',
  openGraph: {
    title: 'Alper — Software Engineer',
    description: 'Selected software projects, engineering notes, and thoughtful interface experiments.',
    type: 'website',
    url: 'https://alper.dev',
    siteName: 'alper.dev',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4fbfc' },
    { media: '(prefers-color-scheme: dark)', color: '#101523' },
  ],
}

const themeScript = `
  (() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : prefersDark ? 'dark' : 'light';

      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.dataset.theme = theme;

      if (localStorage.getItem('${INTRO_STORAGE_KEY}') !== 'complete') {
        document.documentElement.classList.add('intro-pending');
      }
    } catch {
      document.documentElement.classList.add('dark');
      document.documentElement.dataset.theme = 'dark';
      document.documentElement.classList.add('intro-pending');
    }
  })();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark ${styles.root}`}
      suppressHydrationWarning
    >
      <body className={styles.body}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SmoothScroll>
          <IntroGate>
            <div className={styles.appShell}>
              <Header />
              <MainWrapper>{children}</MainWrapper>
              <Footer />
            </div>
          </IntroGate>
        </SmoothScroll>
      </body>
    </html>
  )
}
