import type { Metadata } from "next";
import { EB_Garamond, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  title: "Pomodoro",
  description:
    '"Pomodoro" is a web app that combines the Pomodoro Technique with white noise to boost productivity and focus. It tracks task progress and aids in time management.',
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${ebGaramond.variable} font-sans`}>{children}</body>
    </html>
  );
}
