import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "DailyCaltor",
  description: "Smart Calculators for Business, Nutrition & Everyday Decisions",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
      </head>
      <body className={`${plusJakartaSans.className} antialiased dark bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CurrencyProvider defaultLocale={locale}>
            <FavoritesProvider>
              <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </FavoritesProvider>
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
