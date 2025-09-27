import ContactoView from "@/views/ContactoView"
import { ContactPageType, ContactInfoType, SocialMediaItemType } from "@/types/componentsType"
import { fetchAPI } from "@/lib/api"

const getContactPage = async (): Promise<{ data: ContactPageType } | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/contact-page?populate[0]=hero&populate[1]=hero.backgroundImg`, {
    cache: "force-cache",
    next: { revalidate: 3600 }, // Revalidar cada hora
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contact page:", error);
    return null;
  }
}

export default async function Contacto() {
  const contactPageResponse = await getContactPage();
  
  // Obtener datos de contacto globales y redes sociales
  const globalSettings = await fetchAPI("/api/global-setting?populate[0]=contactInfo&populate[1]=contactInfo.phoneIcon&populate[2]=contactInfo.phoneIcon.customImage&populate[3]=contactInfo.emailIcon&populate[4]=contactInfo.emailIcon.customImage&populate[5]=contactInfo.addressIcon&populate[6]=contactInfo.addressIcon.customImage&populate[7]=socialMedia&populate[8]=socialMedia.icon&populate[9]=socialMedia.icon.customImage");
  const contactInfoGlobal = globalSettings.data.contactInfo as ContactInfoType;
  const socialMedia = globalSettings.data.socialMedia as SocialMediaItemType[];

  console.log("contactPageData", contactPageResponse);
  console.log("contactInfoGlobal", contactInfoGlobal);
  console.log("socialMedia", socialMedia);

  return (
    <ContactoView 
      contactPageData={contactPageResponse?.data || null}
      contactInfoGlobal={contactInfoGlobal}
      socialMedia={socialMedia}
    />
  )
}
