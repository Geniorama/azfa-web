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
import Script from "next/script";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSettings = await fetchAPI(
    "/api/global-setting?populate[0]=header&populate[1]=header.logo&populate[2]=header.topButtons&populate[3]=header.mainMenu&populate[4]=header.availableLanguages&populate[5]=socialMedia&populate[6]=socialMedia.icon&populate[7]=socialMedia.icon.customImage&populate[8]=footer&populate[9]=footer.contactInfo&populate[10]=footer.contactInfo.logo&populate[11]=footer.footerLinksColumns&populate[12]=footer.footerLinksColumns.links&populate[13]=footer.copyright&populate[14]=footer.copyright.developedByLink&populate[15]=footer.copyright.legalLinks&populate[16]=contactInfo&populate[17]=contactInfo.phoneIcon&populate[18]=contactInfo.phoneIcon.customImage&populate[19]=contactInfo.emailIcon&populate[20]=contactInfo.emailIcon.customImage&populate[21]=contactInfo.addressIcon&populate[22]=contactInfo.addressIcon.customImage&populate[23]=header.mainMenu.icon&populate[24]=header.mainMenu.icon.customImage&populate[25]=header.mainMenu.submenu"
  );
  const header = globalSettings.data.header as HeaderTypeData;
  const socialMedia = globalSettings.data.socialMedia as SocialMediaItemType[];
  const footer = globalSettings.data.footer as FooterType;
  const contactInfoGlobal = globalSettings.data.contactInfo as ContactInfoType;

  const footerWithContactInfo = {
    ...footer,
    contactInfoGlobal,
    socialMedia,
  };

  console.log("footerWithContactInfo", footerWithContactInfo);

  return (
    <html lang="es">
      <body className={`${interTight.variable} antialiased bg-background-1`}>
        <AOSProvider>
          <ClientLayoutWrapper header={header} footer={footerWithContactInfo}>
            {/* --- SCRIPTS DE GOOGLE TRANSLATE --- */}
            {/* Div oculto que usa Google Translate */}
            <div
              id="google_translate_element"
              style={{ display: "none" }}
            ></div>

            {/* Script de inicialización */}
            <Script id="google-translate-init" strategy="afterInteractive">
              {`
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'es', // El idioma original de tu sitio
        autoDisplay: false
      }, 'google_translate_element');
    }
  `}
            </Script>

            {/* Script principal de la API de Google Translate */}
            <Script
              strategy="afterInteractive"
              src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            />
            {/* --- FIN DE SCRIPTS --- */}
            {children}
          </ClientLayoutWrapper>
        </AOSProvider>
      </body>
    </html>
  );
}
