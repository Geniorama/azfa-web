'use client'

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { AuthProvider } from "../context/AuthContext";
import { HeaderTypeData, FooterType } from "@/types/componentsType";
import GoogleTranslateSpacer from "./GoogleTranslateSpacer";
interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  header: HeaderTypeData;
  footer: FooterType;
} 


export default function ClientLayoutWrapper({ children, header, footer }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const showBanner = pathname !== "/oferta-inmobiliaria";

  return (
    <AuthProvider>
      <GoogleTranslateSpacer>
        <Header header={header} />
        {children}
        <Footer showBanner={showBanner} footer={footer} />
      </GoogleTranslateSpacer>
    </AuthProvider>
  );
}
