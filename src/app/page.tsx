import HomeView from "@/views/HomeView";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AZFA - Asociación de Zonas Francas de Iberoamérica",
    description:
      "Descubre las oportunidades de inversión en zonas francas de Iberoamérica",
  };
}

// Get home from strapi
const getHome = async () => {
  try {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/homepage?populate[0]=heroSlides&populate[1]=heroSlides.backgroundImage&populate[2]=heroSlides.button&populate[3]=heroSlides.iconLinks&populate[4]=heroSlides.iconLinks.icon.customImage&populate[5]=introContent&populate[6]=introContent.icon&populate[7]=contentWithVideo&populate[8]=contentWithVideo.video&populate[9]=contentWithVideo.video.thumbnail&populate[10]=contentWithVideo.video.uploadedVideo&populate[11]=servicesSection&populate[12]=servicesSection.services&populate[13]=servicesSection.services.coverImage`,
      {
        cache: "force-cache", // Cache estático por defecto
        next: { revalidate: 3600 }, // Revalidar cada hora (3600 segundos)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching home:", error);
    // Retornar null en caso de error para que el componente maneje el fallback
    return null;
  }
};

export default async function Home() {
  const home = await getHome();
  console.log("home", home);

  // Fallback data en caso de error de conexión
  const fallbackData = {
    slidesData: [],
    introData: null,
    contentWithVideoData: null,
    servicesData: null
  };

  return (
    <HomeView 
      slidesData={home?.data?.heroSlides || fallbackData.slidesData}
      introData={home?.data?.introContent || fallbackData.introData}
      contentWithVideoData={home?.data?.contentWithVideo || fallbackData.contentWithVideoData}
      servicesData={home?.data?.servicesSection || fallbackData.servicesData}
    />
  );
}
