import { Inter_Tight } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
import AOSProvider from "../components/AOSProvider";
import { fetchAPI } from "@/lib/api";
import {
  HeaderTypeData,
  SocialMediaItemType,
  FooterType,
  ContactInfoType,
} from "@/types/componentsType";
import { Metadata } from "next";
import GoogleTagManager from "@/components/GoogleTagManager";
import GoogleTranslate from "@/components/GoogleTranslate";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "AZFA | Asociación de Zonas Francas de Iberoamérica",
  description: "Asociación de Zonas Francas de Iberoamérica - Promoviendo el desarrollo económico y comercial",
  icons: {
    icon: [
      { url: "/azfa-favicon.ico", sizes: "any" },
      { url: "/azfa-favicon.png", type: "image/png" },
    ],
    shortcut: "/azfa-favicon.ico",
    apple: "/azfa-favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let header: HeaderTypeData;
  let footerWithContactInfo: FooterType & { contactInfoGlobal: ContactInfoType; socialMedia: SocialMediaItemType[] };

  try {
    const globalSettings = await fetchAPI(
      "/api/global-setting?populate[0]=header&populate[1]=header.logo&populate[2]=header.topButtons&populate[3]=header.mainMenu&populate[4]=header.availableLanguages&populate[5]=socialMedia&populate[6]=socialMedia.icon&populate[7]=socialMedia.icon.customImage&populate[8]=footer&populate[9]=footer.contactInfo&populate[10]=footer.contactInfo.logo&populate[11]=footer.footerLinksColumns&populate[12]=footer.footerLinksColumns.links&populate[13]=footer.copyright&populate[14]=footer.copyright.developedByLink&populate[15]=footer.copyright.legalLinks&populate[16]=contactInfo&populate[17]=contactInfo.phoneIcon&populate[18]=contactInfo.phoneIcon.customImage&populate[19]=contactInfo.emailIcon&populate[20]=contactInfo.emailIcon.customImage&populate[21]=contactInfo.addressIcon&populate[22]=contactInfo.addressIcon.customImage&populate[23]=header.mainMenu.icon&populate[24]=header.mainMenu.icon.customImage&populate[25]=header.mainMenu.submenu"
    );
    const footer = globalSettings.data.footer as FooterType;
    const contactInfoGlobal = globalSettings.data.contactInfo as ContactInfoType;
    const socialMedia = globalSettings.data.socialMedia as SocialMediaItemType[];
    header = globalSettings.data.header as HeaderTypeData;
    footerWithContactInfo = {
      ...footer,
      contactInfoGlobal,
      socialMedia,
    };
  } catch (err) {
    console.error("Error loading global settings (Strapi):", err);
    header = {} as HeaderTypeData;
    footerWithContactInfo = {} as FooterType & { contactInfoGlobal: ContactInfoType; socialMedia: SocialMediaItemType[] };
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <body 
        className={`${interTight.variable} antialiased bg-background-1`}
        suppressHydrationWarning={true}
      >
        <GoogleTagManager />
        <AOSProvider>
          <ClientLayoutWrapper header={header} footer={footerWithContactInfo}>
            {/* Google Translate: se carga bajo demanda (solo si la cookie
                googtrans indica una traducción activa). Ver GoogleTranslate. */}
            <GoogleTranslate />
            {children}
          </ClientLayoutWrapper>
        </AOSProvider>
      </body>
    </html>
  );
}
