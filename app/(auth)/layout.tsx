import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#30a7be" },
        elements: {
          formButtonPrimary: "btn btn-info",
          socialButtonsBlockButton:
            "bg-white border-gray-200 hover:bg-transparent hover:border-info text-gray-600 hover:text-black",
          socialButtonsBlockButtonText: "font-semibold",
          card: "bg-base-200",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-base-100`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
