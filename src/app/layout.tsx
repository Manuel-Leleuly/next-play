import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ProgressAppProvider } from "@/providers/ProgressProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@smastrom/react-rating/style.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieApp",
  description: "Just a recreation of an old AccelPlay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", manrope.className)}>
        <ProgressAppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              {children}
              <Toaster richColors expand position="top-right" />
            </QueryProvider>
          </ThemeProvider>
        </ProgressAppProvider>
      </body>
    </html>
  );
}
