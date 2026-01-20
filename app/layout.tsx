import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

const roboto = Roboto({
  weight: ['100', '700', '900'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Quest Medical - Job Vacancy Generator",
  description: "Create professional LinkedIn job vacancy images for Quest Medical HR team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
