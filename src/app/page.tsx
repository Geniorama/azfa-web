import HomeView from "@/views/HomeView";
import { Metadata } from "next";
import { NewsType, EventType, TestimonialType, SocialMediaItemType } from "@/types/componentsType";
import FloatMenu from "@/components/FloatMenu";

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
      `${process.env.STRAPI_URL}/api/homepage?populate[0]=heroSlides&populate[1]=heroSlides.backgroundImage&populate[2]=heroSlides.button&populate[3]=heroSlides.iconLinks&populate[4]=heroSlides.iconLinks.icon.customImage&populate[5]=introContent&populate[6]=introContent.icon&populate[7]=contentWithVideo&populate[8]=contentWithVideo.video&populate[9]=contentWithVideo.video.thumbnail&populate[10]=contentWithVideo.video.uploadedVideo&populate[11]=servicesSection&populate[12]=servicesSection.services&populate[13]=servicesSection.services.coverImage&populate[14]=statisticsSection&populate[15]=statisticsSection.statistics&populate[16]=statisticsSection.statistics.icon&populate[17]=statisticsSection.statistics.icon.customImage&populate[18]=newsSection&populate[19]=newsSection.viewAllLink&populate[20]=upcomingEventsSection&populate[21]=upcomingEventsSection.viewAllLink&populate[22]=testimonialsSection&populate[23]=affiliatesSection&populate[24]=affiliatesSection.logos&populate[25]=affiliatesSection.logos.logo&populate[26]=partnersSection&populate[27]=partnersSection.logos&populate[28]=partnersSection.logos.logo&populate[29]=sponsorsSection&populate[30]=sponsorsSection.logos&populate[31]=sponsorsSection.logos.logo&populate[32]=servicesSection.services.button`,
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
      `${process.env.STRAPI_URL}/api/events?populate[0]=featuredImage&populate[1]=calendarIcon&populate[2]=locationIcon&populate[3]=addressIcon&populate[4]=calendarIcon.customImage&populate[5]=locationIcon.customImage&populate[6]=addressIcon.customImage&pagination[pageSize]=100&sort=startDate:asc`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Filtrar eventos futuros y tomar solo los próximos 2
    if (data.data && Array.isArray(data.data)) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const futureEvents = data.data
        .filter((event: EventType) => {
          const eventDate = new Date(event.startDate);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate >= today;
        })
        .sort((a: EventType, b: EventType) => {
          const dateA = new Date(a.startDate);
          const dateB = new Date(b.startDate);
          return dateA.getTime() - dateB.getTime();
        })
        .slice(0, 2); // Tomar solo los próximos 2 eventos
      
      return { data: futureEvents };
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
};

const getTestimonials = async (): Promise<{ data: TestimonialType[] } | null> => {
  try {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/testimonials?populate[0]=coverImage&populate[1]=media&pagination[pageSize]=3`,
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
    console.error("Error fetching testimonials:", error);
    return null;
  }
};

const getSocialMedia = async (): Promise<SocialMediaItemType[] | null> => {
  try {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/global-setting?populate[0]=socialMedia&populate[1]=socialMedia.icon&populate[2]=socialMedia.icon.customImage`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.socialMedia;
  } catch (error) {
    console.error("Error fetching social media:", error);
    return null;
  }
};

export default async function Home() {
  const home = await getHome();
  const news = await getNews();
  const events = await getEvents();
  const testimonials = await getTestimonials();
  const socialMedia = await getSocialMedia();
  const affiliates = home?.data?.affiliatesSection;
  const partners = home?.data?.partnersSection;
  const sponsors = home?.data?.sponsorsSection;

  // Fallback data en caso de error de conexión
  const fallbackData = {
    slidesData: [],
    introData: null,
    contentWithVideoData: null,
    servicesData: null,
    statisticsData: null,
    newsData: null,
    newsSectionData: null,
    eventsData: null,
    upcomingEventsSection: null,
    testimonialsData: null,
    testimonialsSectionData: null,
    affiliatesSectionData: null,
    partnersSectionData: null,
    sponsorsSectionData: null
  };

  return (
    <>
      <div className="hidden lg:block fixed top-[50%] -translate-y-[50%] right-0 z-50">
        <FloatMenu socialMedia={socialMedia || []} />
      </div>
      <HomeView 
        slidesData={home?.data?.heroSlides || fallbackData.slidesData}
        introData={home?.data?.introContent || fallbackData.introData}
        contentWithVideoData={home?.data?.contentWithVideo || fallbackData.contentWithVideoData}
        servicesData={home?.data?.servicesSection || fallbackData.servicesData}
        statisticsData={home?.data?.statisticsSection || fallbackData.statisticsData}
        newsData={news?.data || fallbackData.newsData}
        newsSectionData={home?.data?.newsSection || fallbackData.newsSectionData}
        eventsData={events?.data || fallbackData.eventsData}
        eventSectionData={home?.data?.upcomingEventsSection || fallbackData.upcomingEventsSection}
        testimonialsData={testimonials?.data || fallbackData.testimonialsData}
        testimonialsSectionData={home?.data?.testimonialsSection || fallbackData.testimonialsSectionData}
        affiliatesSectionData={affiliates || fallbackData.affiliatesSectionData}
        partnersSectionData={partners || fallbackData.partnersSectionData}
        sponsorsSectionData={sponsors || fallbackData.sponsorsSectionData}
      />
    </>
  );
}
