import { EnvVarWarning } from '@/components/env-var-warning';
import HeaderAuth from '@/components/header-auth';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster } from '@/components/toast/toaster';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';
import ThemeWrapper from '@/components/theme-wrapper';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'TagRewards',
  description:
    'Effortlessly earn rewards and unlock exclusive perks with TagRewards. Tap into a seamless NFC-powered loyalty program that makes every interaction rewarding.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />

        <Toaster />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeWrapper className="flex min-h-screen flex-col items-center">
            <div className="flex w-full flex-1 flex-col items-center gap-20">
              <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
                <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
                  <div className="flex items-center gap-5 font-semibold">
                    <Link href="/">TagRewards</Link>
                    {/* <div className="flex items-center gap-2">
                      <DeployButton />
                    </div> */}
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex max-w-5xl flex-col gap-20 p-5">
                {children}
              </div>

              <footer className="mx-auto flex w-full items-center justify-center gap-8 border-t py-12 text-center text-xs">
                <p>
                  Made with ❤️ by
                  {' '}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    AT
                  </a>
                </p>

                <ThemeSwitcher />
              </footer>
            </div>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
