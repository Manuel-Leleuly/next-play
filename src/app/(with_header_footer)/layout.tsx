import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { ReactNode } from "react";

export default function HeaderFooterLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
