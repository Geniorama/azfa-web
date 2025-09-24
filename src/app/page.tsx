import HomeView from "@/views/HomeView";
import { Metadata } from "next";
import { NewsType, EventType } from "@/types/componentsType";

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
      `${process.env.STRAPI_URL}/api/homepage?populate[0]=heroSlides&populate[1]=heroSlides.backgroundImage&populate[2]=heroSlides.button&populate[3]=heroSlides.iconLinks&populate[4]=heroSlides.iconLinks.icon.customImage&populate[5]=introContent&populate[6]=introContent.icon&populate[7]=contentWithVideo&populate[8]=contentWithVideo.video&populate[9]=contentWithVideo.video.thumbnail&populate[10]=contentWithVideo.video.uploadedVideo&populate[11]=servicesSection&populate[12]=servicesSection.services&populate[13]=servicesSection.services.coverImage&populate[14]=statisticsSection&populate[15]=statisticsSection.statistics&populate[16]=statisticsSection.statistics.icon&populate[17]=statisticsSection.statistics.icon.customImage&populate[18]=newsSection&populate[19]=newsSection.viewAllLink`,
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

const getNews = async (): Promise<{ data: NewsType[] } | null> => {
  try {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/press-rooms?filters[type][$eq]=news&populate[0]=thumbnail&populate[1]=category&pagination[pageSize]=2`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};

const getEvents = async (): Promise<{ data: EventType[] } | null> => {
  try {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/events?populate[0]=featuredImage&populate[1]=calendarIcon&populate[2]=locationIcon&populate[3]=addressIcon&populate[4]=calendarIcon.customImage&populate[5]=locationIcon.customImage&populate[6]=addressIcon.customImage&pagination[pageSize]=2`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
};


export default async function Home() {
  const home = await getHome();
  const news = await getNews();
  const events = await getEvents();
  console.log("home", home);
  console.log("news", news);
  console.log("events", events);

  // Fallback data en caso de error de conexión
  const fallbackData = {
    slidesData: [],
    introData: null,
    contentWithVideoData: null,
    servicesData: null,
    statisticsData: null,
    newsData: null,
    newsSectionData: null,
    eventsData: null
  };

  return (
    <HomeView 
      slidesData={home?.data?.heroSlides || fallbackData.slidesData}
      introData={home?.data?.introContent || fallbackData.introData}
      contentWithVideoData={home?.data?.contentWithVideo || fallbackData.contentWithVideoData}
      servicesData={home?.data?.servicesSection || fallbackData.servicesData}
      statisticsData={home?.data?.statisticsSection || fallbackData.statisticsData}
      newsData={news?.data || fallbackData.newsData}
      newsSectionData={home?.data?.newsSection || fallbackData.newsSectionData}
      eventsData={events?.data || fallbackData.eventsData}
    />
  );
}
