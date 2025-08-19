import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { UserCookiesSchema } from "@/models/fetchModels";
import { ConfigContextProvider } from "@/providers/ConfigProvider";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function HeaderFooterLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const serverCookies = await cookies();
  const userCookiesStr = serverCookies.get("user");
  const userCookies = userCookiesStr
    ? UserCookiesSchema.safeParse(JSON.parse(userCookiesStr.value)).data
    : undefined;

  return (
    <ConfigContextProvider userCookies={userCookies}>
      <Navbar />
      {children}
      <Footer />
    </ConfigContextProvider>
  );
}
