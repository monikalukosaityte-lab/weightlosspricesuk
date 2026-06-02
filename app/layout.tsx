import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compare Weight Loss Medication Prices UK | WeightLossPricesUK",
  description: "Compare weight loss medication prices across UK-registered online providers. Updated daily.",
  metadataBase: new URL("https://www.weightlosspricesuk.co.uk"),
  robots: { index: true, follow: true },
  icons: { icon: "/weightlosspricesuk-favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
