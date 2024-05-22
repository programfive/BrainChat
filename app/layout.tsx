import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrainChat",
  description:
    "A real-time chat application for efficient communication and connection.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <ScrollArea>{children}</ScrollArea>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
