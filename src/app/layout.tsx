import { TmdbApi } from "@/api/tmdb/tmdb";
import { UserDetailType } from "@/api/tmdb/tmdbModels";
import { Toaster } from "@/components/ui/sonner";
import { NetworkLib } from "@/lib/NetworkLib";
import { cn } from "@/lib/utils";
import { UserCookiesSchema } from "@/models/fetchModels";
import { ConfigContextProvider } from "@/providers/ConfigProvider";
import { ProgressAppProvider } from "@/providers/ProgressProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@smastrom/react-rating/style.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieApp",
  description: "Just a recreation of an old AccelPlay",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverCookies = await cookies();
  const userCookiesStr = serverCookies.get("user");
  const userCookies = userCookiesStr?.value
    ? UserCookiesSchema.safeParse(JSON.parse(userCookiesStr.value)).data
    : undefined;

  let userDetail:
    | (UserDetailType & { username: string; session_id: string })
    | null = null;

  if (userCookies) {
    try {
      const network = NetworkLib.withTMDBToken();
      const result = await TmdbApi.getUserDetail(
        network,
        userCookies.session_id
      );
      userDetail = {
        ...result,
        ...userCookies,
      };
    } catch (error) {
      console.error(error);
    }
  }

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
              <ConfigContextProvider
                userCookies={userCookies}
                userDetail={userDetail}
              >
                {children}
                <Toaster richColors expand position="top-right" />
              </ConfigContextProvider>
            </QueryProvider>
          </ThemeProvider>
        </ProgressAppProvider>
      </body>
    </html>
  );
}
