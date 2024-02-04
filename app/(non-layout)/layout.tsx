import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onboarding - Querentia",
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
        <body className={`${inter.className}`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
