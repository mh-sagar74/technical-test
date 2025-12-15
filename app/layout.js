import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import '@/app/globals.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Technical Test",
  description: "This is a tree style folder app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-[30px] my-[20px]`}
      >
        <GluestackUIProvider>
          {children}
        </GluestackUIProvider>
      </body>
    </html>
  );
}
