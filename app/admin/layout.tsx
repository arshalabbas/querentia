import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Metadata } from "next";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin - Querentia",
  description:
    "Connecting Hearts Sharing Solutions - Your space for well-being",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <main className="mx-auto flex max-w-6xl flex-col justify-start px-10 max-sm:px-0 py-10">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
