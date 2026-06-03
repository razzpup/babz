import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lato, Roboto } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-roboto',
});

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "BAB-Z",
  description: "Official website of BAB-Z, explore his latest releases, tour dates, and exclusive content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${lato.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
