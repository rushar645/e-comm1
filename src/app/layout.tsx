import type React from "react";
import type { Metadata } from "next";
import {Playfair_Display, Poppins} from "next/font/google";
import "./globals.css";

import AuthProvider from "@/components/session-provider"; // 👈 this is your wrapper
import { ThemeWrapper } from "@/components/theme-wrapper";
import { CartProvider } from "@/contexts/cart-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { Toaster } from "@/components/ui/use-toast";
import Footer from "@/components/footer";

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700"], // Add weights you need
  variable: '--font-playfair', // Optional: For Tailwind custom font-family
  display: 'swap',
})

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700"], // Add weights you need
  variable: '--font-playfair', // Optional: For Tailwind custom font-family
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Dress Dexterity",
  description: "Elegant clothing for all occasions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable}`}>
        <ThemeWrapper>
          <AuthProvider> {/* ✅ Wrap client component here */}
            <CartProvider>
              <WishlistProvider>
                {children}
                <Footer />

                <Toaster />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
