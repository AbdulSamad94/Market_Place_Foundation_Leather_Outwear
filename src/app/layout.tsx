import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import StripeProvider from "@/lib/StripeProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "E-Commerce Website by AS",
  description:
    "A Modern E-Commerce Website using Next.js & tailwindCSS of figma desin. ",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <StripeProvider>
            <Header />
            {children}
            <Footer />
          </StripeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
