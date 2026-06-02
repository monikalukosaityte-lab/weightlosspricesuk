import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Compare Weight Loss Medication Prices UK | WeightLossPricesUK",
  description: "Compare weight loss medication prices across UK-registered online providers. Updated daily.",
  metadataBase: new URL("https://www.weightlosspricesuk.co.uk"),
  robots: { index: false, follow: false },
  icons: { icon: "/weightlosspricesuk-favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
