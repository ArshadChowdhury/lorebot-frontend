import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import { HydrationWrapper } from "@/components/others/hydration-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LoreBot - AI Character Chat",
  description: "Chat with characters in a shared fantasy world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <QueryProvider>
          <HydrationWrapper>{children}</HydrationWrapper>
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
